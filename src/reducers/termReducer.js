import { SEARCH_TERM } from "../actions/types";

const INTIAL_STATE = {
  sterm: "Dota",
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case "SEARCH_TERM":
      return { ...state, sterm: action.payload };
    default:
      return state;
  }
};
