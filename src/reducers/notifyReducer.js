import { NOTIFY } from "../actions/types";

const INTIAL_STATE = {
  message: null,
};

const notifyReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFY:
      return { ...state, message: action.payload.message };
    default:
      return state;
  }
};

export default notifyReducer
