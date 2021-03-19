import { NOTIFY } from "../actions/types";

const INTIAL_STATE = {
  message: null,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFY:
      return { ...state, message: action.payload.message };
    default:
      return state;
  }
};
