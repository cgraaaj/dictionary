import { SET_DEFINITION, SET_AUIDOURL } from "../actions/types";

const INTIAL_STATE = {
  definitionResp: {},
  audioURL: null,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_DEFINITION:
      return { ...state, definitionResp: action.payload.data };
    case SET_AUIDOURL:
      return {
        ...state,
        audioURL: action.payload.data,
      };
    default:
      return state;
  }
};
