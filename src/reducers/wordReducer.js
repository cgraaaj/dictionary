import {
  SIGN_IN,
  SIGN_OUT,
  SET_DEFINITION,
  FETCH_WORDS,
} from "../actions/types";

const INTIAL_STATE = {
  definitionResp: {},
  words: [],
};

const wordReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_DEFINITION:
      return { ...state, definitionResp: action.payload.data };
    case FETCH_WORDS:
      return { ...state, words: action.payload.data };
    case SIGN_IN:
      return { ...state, words: action.payload.words };
    case SIGN_OUT:
      return { ...state, words: action.payload.words };
    default:
      return state;
  }
};

export default wordReducer;
