import _ from "lodash";

import dict from "../apis/dict";
import { SIGN_IN, SIGN_OUT, SEARCH_TERM, FETCH_DATA } from "./types";

export const fetchData = (term) => async (dispatch) => {
  const response = await dict.get(
    `/collegiate/json/${term}?key=ee2768a1-8b8e-4617-a361-9072d8efc137`
  );
  dispatch({
    type: FETCH_DATA,
    payload: { term, data: response.data },
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

export const signIn = (profile) => {
  return {
    type: SIGN_IN,
    payload: {
      uid: profile.getId(),
      uname: profile.getName(),
      email: profile.getEmail(),
      imageURL: profile.getImageUrl(),
    },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
