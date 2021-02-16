import { FETCH_DATA } from "../actions/types";

const INTIAL_STATE = {
  words: [],
  sword: "",
  audio: "",
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DATA:
      const payload = action.payload;
      if (!payload.data[0].hasOwnProperty("meta")) {
        return { ...state, words: "", sword: action.term, audio: "tneaw" };
      }
      return {
        ...state,
        words: payload.data,
        sword: payload.term,
        audio: payload.data[0].hwi.hasOwnProperty("prs")
          ? payload.data[0].hwi.prs[0].hasOwnProperty("sound")
            ? payload.data[0].hwi.prs[0].sound.audio
            : ""
          : "",
      };

    default:
      return state;
  }
};
