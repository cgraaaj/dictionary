// import _ from "lodash";

import { dictAPI, GbookAPI, wordTrackerAPI } from "../apis/dict";
import jp from "jsonpath";
import _, { extendWith } from "lodash";

import history from "../history";
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
import { getUser, createUser , getBooks, createWord} from "../utils/apiCalls";

export const fetchData = (term) => async (dispatch) => {
  const response = await dictAPI.get(
    `/collegiate/json/${term}?key=${process.env.REACT_APP_MERRIAM_WEBSTER_API_KEY}`
  );
  dispatch({
    type: FETCH_DATA,
    payload: { term, data: response.data },
  });
};

export const searchTerm = (term) => {
  return {
    type: SEARCH_TERM,
    payload: term,
  };
};

export const signIn =  (currentUser) => async (dispatch, getState) => {
// check if user available
let user = await getUser(currentUser)
if(user === null){
user  = await createUser(currentUser)
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
      user
    },
  })
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
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
  let userBooks = await getBooks (user, gbookResponse);
  // console.log(response);
  console.log(userBooks);

  dispatch(
    {
      type: FETCH_BOOKS,
      payload: userBooks,
    }
  );
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

export const setDefinition = (wordData) => async (dispatch, getState) => {
  const user = getState().gAuth.user;
  console.log(user._id);
  const book = getState().books.selectedBook;
  console.log(book._id);
  let response = {};
  // general words
  if (_.isEmpty(book)) {
    // console.log(book, word, userId);
    // var localWords = jp.query(data, `$.generalWords[*]`);

    // await wordTrackerAPI.put(`/users/${userId}`, {
    //   ...data,
    //   generalWords:updatedWords
    // });
  }
  //for books
  else {
    response = await createWord(user._id,book._id,wordData);
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
