// import _ from "lodash";

import { dictAPI, GbookAPI, wordTrackerAPI } from "../apis/dict";
import jmesPath from "jmespath";
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
    `/collegiate/json/${term}?key=ee2768a1-8b8e-4617-a361-9072d8efc137`
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
    const response =
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

export const setDefinition = (book, word, userId) => async () => {
  var put = false;
  const user = await wordTrackerAPI.get(`/users/${userId}`);
  var data = user.data;
  var localWords = jp.query(
    data,
    `$.books[?(@.isbn_13 == '${book.id}')].words[*]`
  );
  if (_.isEqual(localWords, [])) {
    put = !put;
    localWords.push(word);
  } else {
    put = !put;
    var updated = false;
    //update already seached word with new definition
    localWords = localWords.map((w) => {
      if (w.search_word === word.search_word) {
        updated = !updated;
        return word;
      } else {
        return w;
      }
    });
    //add the word to list
    if (!updated) localWords.push(word);
  }
  var localBook = jp.query(data, `$.books[?(@.isbn_13 == '${book.id}')]`)[0];
  localBook.words = localWords;
  const updatedBooks = data.books.map((book) =>
    book.isbn_13 === book.id ? localBook : book
  );
  if (put) {
    await wordTrackerAPI.put(`/users/${userId}`, {
      ...data,
      books: updatedBooks,
    });
  } else {
    console.log("nothhing to update");
  }

  return {
    type: SET_DEFINITION,
    payload: {
      isUpdated: put,
    },
  };
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
