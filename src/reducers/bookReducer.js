import { FETCH_BOOKS, SIGN_OUT } from "../actions/types";

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return action.payload.data;
    case SIGN_OUT:
      return INTIAL_STATE;
    default:
      return state;
  }
};
