// import _ from "lodash";

import { dictionaryAPI, GbookAPI } from "../apis/dict";
import _ from "lodash";

import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_DATA,
  FETCH_BOOKS,
  SELECT_BOOK,
  SET_DEFINITION,
  SEARCH_TERM,
  FETCH_WORDS,

  NOTIFY,
  SET_MODAL,
} from "./types";
import {
  getUser,
  createUser,
  getBooks,
  createWord,
  getWords,
} from "../utils/apiCalls";

export const fetchData = (term) => async (dispatch) => {
  const language = "en_US";
  let response = "";
  try {
    response = await dictionaryAPI.get(`/${language}/${term}`);
    response = response.data;
  } catch (err) {
    response = err.response.data;
  }
  dispatch({
    type: FETCH_DATA,
    payload: { data: response },
  });
};

export const searchTerm = (term) => {
  return {
    type: SEARCH_TERM,
    payload: term,
  };
};

export const signIn = (currentUser) => async (dispatch, getState) => {
  // check if user available
  let user = await getUser(currentUser);
  if (user === null) {
    user = await createUser(currentUser);
  }
  dispatch({
    type: SIGN_IN,
    payload: {
      userId: currentUser.getBasicProfile().getId(),
      name: currentUser.getBasicProfile().getName(),
      email: currentUser.getBasicProfile().getEmail(),
      imageURL: currentUser.getBasicProfile().getImageUrl(),
      authResponse: currentUser.getAuthResponse(),
      currentUser,
      user,
    },
  });

  let words = await getWords(user._id);
  dispatch({
    type: FETCH_WORDS,
    payload: {
      words: words.payload,
    },
  });
  // check how to reuse the function fetchbooks here
  const { access_token } = getState().gAuth.authResponse;
  user = getState().gAuth.user;
  const gbookResponse = await GbookAPI.get(
    `/mylibrary/bookshelves/3/volumes`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  let userBooks = await getBooks(user, gbookResponse);
  dispatch({
    type: FETCH_BOOKS,
    payload: userBooks,
  });
};

export const signOut = () => async (dispatch) => {
  let words = await getWords();
  console.log(words);
  dispatch({
    type: SIGN_OUT,
  });
  dispatch({
    type: FETCH_WORDS,
    payload: {
      words: words.payload,
    },
  });
};

export const fetchBooks = (bookShelfID) => async (dispatch, getState) => {
  console.log(getState());
  const { access_token } = getState().gAuth.authResponse;
  const user = getState().gAuth.user;
  const gbookResponse = await GbookAPI.get(
    `/mylibrary/bookshelves/${bookShelfID}/volumes`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  let userBooks = await getBooks(user, gbookResponse);
  // console.log(response);
  console.log(userBooks);

  dispatch({
    type: FETCH_BOOKS,
    payload: userBooks,
  });
};

export const selectBook = (_id, isbn_13, title) => {
  return {
    type: SELECT_BOOK,
    payload: {
      _id,
      isbn_13,
      title,
    },
  };
};

export const fetchWords = () => async (dispatch, getState) => {
  const user = getState().gAuth.user;
  console.log(user._id);
  const book = getState().books.selectedBook;
  console.log(book._id);
  let words = {};

  words = await getWords(user._id, book._id);

  dispatch({
    type: FETCH_WORDS,
    payload: {
      words: words.payload,
    },
  });
};

export const setDefinition = (wordData) => async (dispatch, getState) => {
  const user = getState().gAuth.user;
  console.log(user._id);
  const book = getState().books.selectedBook;
  console.log(book._id);
  let response = {};
  // anonymous
  if (!user._id) {
    response = await createWord(wordData);
    console.log(response);
  }
  // general words
  else if (_.isEmpty(book)) {
    response = await createWord(wordData, user._id);
    console.log(response);
  }
  //for books
  else {
    response = await createWord(wordData, user._id, book._id);
    console.log(response);
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

export const addBook =
  ({ isbn, shelf }) =>
  async (dispatch, getState) => {
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
            Authorization: `Bearer ${
              getState().gAuth.authResponse.access_token
            }`,
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
    // navigate to list books
    history.push("/books");
  };

export const setModal = (modal) => {
  return {
    type: SET_MODAL,
    payload: modal,
  };
};
