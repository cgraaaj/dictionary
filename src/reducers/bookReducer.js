import { FETCH_BOOKS, SIGN_OUT, SELECT_BOOK } from "../actions/types";
import _ from "lodash";

const INTIAL_STATE = {
  books: [],
  selectedBook: {},
};

const bookReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, books: _.mapKeys(action.payload,'isbn_13') };
    case SIGN_OUT:
      return {...INTIAL_STATE};
    case SELECT_BOOK:
      return { ...state, selectedBook: action.payload };
    default:
      return state;
  }
};

export default bookReducer