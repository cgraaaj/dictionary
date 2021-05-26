import { wordTrackerAPI } from "../apis/dict";
import {ANONYMOUS_USER_ID, ANONYMOUS_BOOK_ID} from "../utils/constants"

const getBookIds = async (gbooks) => {
  console.log(gbooks);
  // get local books
  let query = `{
    bookMany{
      _id
      isbn_13
    }
  }`;
  var bookResp = await wordTrackerAPI.post(
    "",
    {
      query,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  var books = bookResp.data.data.bookMany;
  let bookIds = books.map((bookid) => bookid["isbn_13"]);
  var allBooks = ``;
  let oldBookIds = [];
  // check for new books if any
  gbooks.forEach((gbook) => {
    if (!bookIds.includes(gbook.volumeInfo.industryIdentifiers[1].identifier)) {
      var b = `{
          isbn_13:"${gbook.volumeInfo.industryIdentifiers[1].identifier}"
          title:"${gbook.volumeInfo.title}"
          authors:"${gbook.volumeInfo.authors}"
          image_url:"${
            gbook.volumeInfo.hasOwnProperty("imageLinks")
              ? gbook.volumeInfo.imageLinks.smallThumbnail
              : null
          }"
          info:"${gbook.volumeInfo.infoLink}"
          description:"${gbook.volumeInfo.description}"
        }`;
      allBooks = allBooks.concat(b);
    } else {
      oldBookIds.push(
        books.find(
          (book) =>
            book.isbn_13 === gbook.volumeInfo.industryIdentifiers[1].identifier
        )._id
      );
    }
  });
  // create new books
  if (allBooks !== "") {
    let query = `mutation{
      bookCreateMany(records:[${allBooks}]){
        recordIds
        createdCount
      }
    }`;
    let bookResp = await wordTrackerAPI.post(
      "",
      {
        query,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(bookResp);

    let newBookIds = bookResp.data.data.bookCreateMany.recordIds;

    console.log(newBookIds);
    return {
      message: "new books added",
      newBookIds,
      payload: oldBookIds.concat(newBookIds),
      update: true,
    };
  } else {
    return {
      message: "no new books to add",
      payload: oldBookIds,
      update: false,
    };
  }
};

export const createUser = async (currentUser) => {
  let query = `mutation {
    userCreateOne(record:{guserId:"${currentUser
      .getBasicProfile()
      .getId()}" name:"${currentUser
    .getBasicProfile()
    .getName()}" email:"${currentUser
    .getBasicProfile()
    .getEmail()}" image_url:"${currentUser.getBasicProfile().getImageUrl()}"})
  {
    record{
      _id
      guserId
      name
      email
      image_url
    }
  }
}`;

  let userResp = await wordTrackerAPI.post(
    "",
    {
      query,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let user = userResp.data.data.userCreateOne.record;
  console.log(user);
  return user;
};

export const getUser = async (currentUser) => {
  let user = await wordTrackerAPI.post(
    "",
    {
      query: `{
        userOne(filter:{guserId:"${currentUser.getBasicProfile().getId()}"}){
          _id
          guserId
          name
          email
          image_url
        }
      }`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(user);
  user = user.data.data.userOne;
  return user;
};

export const getBooks = async (user, gbookResponse) => {
  const gbooks = gbookResponse.data.items;
  console.log(gbookResponse.data);
  // check for books existance
  let bookIds = await getBookIds(gbooks);
  console.log(bookIds);

  if (bookIds.update) {
    // update user
    let query = `mutation userUpdateOne($bookIds: [MongoID]){
    userUpdateOne(record:{
      bookIds: $bookIds
    } filter:{guserId:"${user.guserId}"}){
      record{
        books{
          _id
          isbn_13
          title
          authors
          image_url
          info
          description
        }
      }
    }
  }`;

    let userResp = await wordTrackerAPI.post(
      "",
      {
        query,
        variables: {
          bookIds: bookIds.payload,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let userBooks = userResp.data.data.userUpdateOne.record.books;
    console.log(userBooks);
    return userBooks;
  }
  //get user books
  user = await wordTrackerAPI.post(
    "",
    {
      query: `{
        userOne(filter:{guserId:"${user.guserId}"}){
          books{
            _id
            isbn_13
            title
            authors
            image_url
            info
            description
          }
        }
      }`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(user);
  user = user.data.data.userOne;
  return user.books;
};

export const createWord = async (
  wordData,
  userId = ANONYMOUS_USER_ID,
  bookId = ANONYMOUS_BOOK_ID
) => {
  // check if the word exits
  let word = await wordTrackerAPI.post(
    "",
    {
      query: `{
        wordOne(filter:{search_word:"${wordData.search_word}"}){
          search_word
          userIds{
            userId
            bookIds
          }
        }
      }`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(word);
  word = word.data.data.wordOne;
  if (word !== null) {
    let wordUserIds = word.userIds;
    //check userid in the list
    let userIndex = 0;
    let user = wordUserIds.find((user, index) => {
      userIndex = index;
      return user.userId === userId;
    });
    let update = false;
    console.log(user, !user);
    if (!user) {
      // create userId:bookIds pair
      let bookIds = [];
      bookIds.push(bookId);
      // pair created
      user = { userId, bookIds };
      // push to wordUserIds
      wordUserIds.push(user);
      update = true;
      console.log("new userId added");
    }
    // check if users bookIds has current book
    else if (!user.bookIds.includes(bookId)) {
      let bookIds = user.bookIds;
      bookIds.push(bookId);
      // pair created with updated books
      user = { userId, bookIds };
      // wordUserIds.push(user);
      wordUserIds.splice(userIndex, 1, user);
      update = true;
      console.log("new bookId added");
    } else {
      console.log("nothing to update");
      return { message: "nothing to update", payload: word };
    }
    // update word data with userid
    if (update) {
      let word = await wordTrackerAPI.post(
        "",
        {
          query: `mutation wordUpdateOne($wordUserIds: [UpdateOneWordUserIdsInput]){
          wordUpdateOne(filter:{search_word:"${wordData.search_word}"} record:{
            userIds: $wordUserIds
          }){
            record{
              userIds{
                userId
                bookIds
              }
            }
          }
        }`,
          variables: {
            wordUserIds,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(word);
      word = word.data.data.wordUpdateOne;
      return { message: "word updated with user/book ID", payload: word };
    }
  }
  // create new word entry
  let wordUserIds = [];
  let bookIds = [];
  bookIds.push(bookId);
  let user = { userId, bookIds };
  wordUserIds.push(user);
  word = await wordTrackerAPI.post(
    "",
    {
      query: `mutation wordCreateOne($definitions: [String]!, $wordUserIds: [WordUserIdsInput], $phonetic: WordPhoneticInput){
        wordCreateOne(record:{
          search_word:"${wordData.search_word}"
          definitions:$definitions
          phonetic:$phonetic
          userIds:$wordUserIds
        }){
          record{
            _id
          }
        }
      }`,
      variables: {
        definitions: wordData.definitions,
        phonetic: wordData.phonetic,
        wordUserIds,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(word);
  word = word.data.data.wordCreateOne;
  return { message: "word created", payload: word };
};

export const getWords = async (userId, bookId) => {
  let query = ``;
  let wordsByUsersBook=false
  if (!userId) {
    query = `{
      wordMany{
        _id
        search_word
        phonetic{
          text,
          audio
        }
        definitions
      }
    }`;
  } else if (userId && bookId===undefined) {
    query = `{
      wordMany(filter:{userIds:{userId:"${userId}"}}){
        _id
        search_word
        phonetic{
          text,
          audio
        }
        definitions
      }
    }`;
  } else {
    wordsByUsersBook = true;
    query =`{
      wordsByUsersBook(userId:"${userId}" bookId:"${bookId}"){
        _id
        search_word
        phonetic{
          text,
          audio
        }
        definitions
      }
    }`
  }
  let words = await wordTrackerAPI.post(
    "",
    {
      query,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(words);
  if(wordsByUsersBook){
    words = words.data.data.wordsByUsersBook;  
  }else{
    words = words.data.data.wordMany;
  }
  
  return { message: "words fetched", payload: words };
};
