import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: false,
  userId: null,
  name: null,
  email: null,
  imageURL: null,
  authResponse: null,
  currentUser: null,
  user:{}
};

const gAuthReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      // console.log(action.payload);
      return { ...state, isSignedIn: true, ...action.payload };
    case SIGN_OUT:
      return {
        ...INTIAL_STATE
      };
    default:
      return state;
  }
};

export default gAuthReducer