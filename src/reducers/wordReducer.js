import _ from "lodash";

import {
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
      return { ...state, words: _.mapKeys(action.payload.words,"_id") };
    default:
      return state;
  }
};

export default wordReducer;
