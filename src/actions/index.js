// import _ from "lodash";

import { dict, book } from "../apis/dict";
import {
  SIGN_IN,
  SIGN_OUT,
  SEARCH_TERM,
  FETCH_DATA,
  FETCH_BOOKS,
} from "./types";

export const fetchData = (term) => async (dispatch) => {
  const response = await dict.get(
    `/collegiate/json/${term}?key=ee2768a1-8b8e-4617-a361-9072d8efc137`
  );
  dispatch({
    type: FETCH_DATA,
    payload: { term, data: response.data },
  });
};

export const fetchBooks = (bookShelfID, accesstoken) => async (dispatch) => {
  const response = await book.get(
    `/mylibrary/bookshelves/${bookShelfID}/volumes`,
    {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
        "Content-Type": "application/json",
      },
    }
  );
  dispatch({
    type: FETCH_BOOKS,
    payload: { data: response.data },
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

export const searchTerm = (term) => {
  return {
    type: SEARCH_TERM,
    payload: term,
  };
};

export const signIn = (currentUser) => {
  return {
    type: SIGN_IN,
    payload: {
      uid: currentUser.getBasicProfile().getId(),
      uname: currentUser.getBasicProfile().getName(),
      email: currentUser.getBasicProfile().getEmail(),
      imageURL: currentUser.getBasicProfile().getImageUrl(),
      authRespose: currentUser.getAuthResponse(),
      currentUser,
    },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
