import { FETCH_DATA } from "../actions/types";
import { getAudioURL } from "../utils/getAudioURL";

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
        return {
          ...state,
          words: "",
          sword: action.term,
          audio: "/resource/tneaw.mp3",
        };
      }
      return {
        ...state,
        words: payload.data,
        sword: payload.term,
        audio: getAudioURL(payload.data[0]),
      };

    default:
      return state;
  }
};
