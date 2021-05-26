import _ from "lodash";

import { FETCH_DATA, SET_MODAL } from "../actions/types";
import { getAudioURL } from "../utils/getAudioURL";

const INTIAL_STATE = {
  words: [],
  modal: {
    flag: false,
    example: "",
    synonyms: [],
  },
};

const dataReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        words: action.payload.data,
      };
    case SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
