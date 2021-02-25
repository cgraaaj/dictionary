import {
  FETCH_BOOKS,
  SIGN_OUT,
  SELECT_BOOK,
  SET_DEFINITION,
} from "../actions/types";

const INTIAL_STATE = {
  books: {},
  selectedBook: null,
  isDefinitionSet: false,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, books: action.payload.data };
    case SIGN_OUT:
      return INTIAL_STATE;
    case SELECT_BOOK:
      return { ...state, selectedBook: action.payload };
    case SET_DEFINITION:
      return { ...state, isDefinitionSet: action.payload };
    default:
      return state;
  }
};
