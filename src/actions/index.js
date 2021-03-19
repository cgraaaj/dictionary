// import _ from "lodash";

import { dictAPI, GbookAPI, wordTrackerAPI } from "../apis/dict";
import jp from "jsonpath";
import _ from "lodash";
import {
  SIGN_IN,
  SIGN_OUT,
  SEARCH_TERM,
  FETCH_DATA,
  FETCH_BOOKS,
  SELECT_BOOK,
  SET_DEFINITION,
  NOTIFY,
} from "./types";
import { _postUser, _putUser } from "../utils/apiCalls";

export const searchTerm = (term) => {
  return {
    type: SEARCH_TERM,
    payload: term,
  };
};

export const fetchData = (term) => async (dispatch) => {
  const response = await dictAPI.get(
    `/collegiate/json/${term}?key=${process.env.REACT_APP_MERRIAM_WEBSTER_API_KEY}`
  );
  dispatch({
    type: FETCH_DATA,
    payload: { term, data: response.data },
  });
};

export const fetchBooks = (bookShelfID, accesstoken, userProp) => async (
  dispatch
) => {
  const gResponse = await GbookAPI.get(
    `/mylibrary/bookshelves/${bookShelfID}/volumes`,
    {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "application/json",
      },
    }
  );
  try {
    const trackResponse = await wordTrackerAPI.get("/users");
    const user = trackResponse.data.filter((user) => user.id === userProp.uid);
    // const response =
    // console.log(gResponse);
    user.length > 0
      ? await _putUser(user.shift(), gResponse)
      : await _postUser(userProp);
    // console.log(response);
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: FETCH_BOOKS,
    payload: { data: gResponse.data },
  });
};

export const selectBook = (id, name) => {
  return {
    type: SELECT_BOOK,
    payload: {
      id,
      name,
    },
  };
};

export const setDefinition = (book, word, userId) => async (dispatch) => {
  let response = {};
  let put = false;
  const user = await wordTrackerAPI.get(`/users/${userId}`);
  var data = user.data;
  // general words
  if (book === null) {
    console.log(book, word, userId);
    // var localWords = jp.query(data, `$.generalWords[*]`);

    // await wordTrackerAPI.put(`/users/${userId}`, {
    //   ...data,
    //   generalWords:updatedWords
    // });
  }
  //for books
  else {
    var localWords = jp.query(
      data,
      `$.books[?(@.isbn_13 == '${book.id}')].words[*]`
    );
    //check if its the first word
    if (_.isEqual(localWords, [])) {
      put = !put;
      localWords.push(word);
    }
    // more than one word present already
    else {
      var updated = false;
      //update already seached word with new definition
      localWords = localWords.map((w) => {
        if (w.search_word === word.search_word) {
          updated = !updated;
          let tempw = w;
          delete tempw.date_time;
          let tempword = word;
          delete tempword.date_time;
          if (!(JSON.stringify(tempw) === JSON.stringify(tempword))) {
            put = !put;
            return word;
          } else {
            return w;
          }
        } else {
          return w;
        }
      });
      //add the word to list
      if (!updated) {
        put = !put;
        localWords.push(word);
      }
    }
    //update new word in selected book
    // filter the selected book
    var localBook = jp.query(data, `$.books[?(@.isbn_13 == '${book.id}')]`)[0];
    localBook.words = localWords;
    const updatedBooks = data.books.map((book) =>
      book.isbn_13 === book.id ? localBook : book
    );
    if (put) {
      response = await wordTrackerAPI.put(`/users/${userId}`, {
        ...data,
        books: updatedBooks,
      });
    } else {
      response = "nothing to update";
    }
  }
  dispatch({
    type: SET_DEFINITION,
    payload: {
      data: response,
    },
  });
};

//memoize
// const _fetchData = _.memoize(async (term, dispatch) => {
//   const response = await dict.get(
//     `/collegiate/json/${term}?key=ee2768a1-8b8e-4617-a361-9072d8efc137`
//   );
//   dispatch({
//     type: "FETCH_DATA",
//     payload: { term, data: response.data },
//   });
// });

export const signIn = (currentUser) => {
  return {
    type: SIGN_IN,
    payload: {
      uid: currentUser.getBasicProfile().getId(),
      name: currentUser.getBasicProfile().getName(),
      email: currentUser.getBasicProfile().getEmail(),
      imageURL: currentUser.getBasicProfile().getImageUrl(),
      authResponse: currentUser.getAuthResponse(),
      currentUser,
    },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const addBook = ({ isbn, shelf }, access_token) => async (dispatch) => {
  let res;
  const response = await GbookAPI.get("/volumes", {
    params: { q: `isbn:${isbn}` },
  });
  if (response.data.totalItems > 0) {
    let volumeId = response.data.items[0].id;
    const addResp = await GbookAPI.post(
      `/mylibrary/bookshelves/${shelf}/addVolume`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        params: { volumeId: volumeId },
      }
    );
    res = {
      type: NOTIFY,
      payload: {
        message: `Book ${response.data.items[0].volumeInfo.title} has been added...`,
        response,
      },
    };
  } else {
    res = {
      type: NOTIFY,
      payload: {
        message: "No book found",
        response,
      },
    };
  }
  dispatch(res);
};
