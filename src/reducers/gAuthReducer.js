import _ from "lodash";

import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: null,
  uid: null,
  uname: null,
  email: null,
  imageURL: null,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, ...action.payload };
    case SIGN_OUT:
      return {
        ...INTIAL_STATE,
        isSignedIn: false,
      };
    default:
      return state;
  }
};
