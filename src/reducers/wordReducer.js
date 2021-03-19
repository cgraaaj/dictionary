import { SET_DEFINITION } from "../actions/types";

const INTIAL_STATE = {
  definitionResp: {},
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_DEFINITION:
      return { ...state, definitionResp: action.payload.data };
    default:
      return state;
  }
};
