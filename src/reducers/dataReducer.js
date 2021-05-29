import _ from "lodash";

import { FETCH_DATA, SET_MODAL } from "../actions/types";

const INTIAL_STATE = {
  words: [],
  modal: {
    flag: false,
    example: "",
    synonyms: [],
  },
  cards:{
    1:{
      id:1,
      content:"hp",
      gif:"/resource/dobby.gif",
      audio:"/resource/dobby.mp3",
      alt:"Dobby feels sorry, Sir",
      header:"You mustn't be angry with dobby.",
      meta:"Dobby couldn't find the word",
      description:"Dobby hopes that you will find the definition, If you search in Google. Sir."
    },
    2:{
      id:2,
      content:"friends_joey",
      gif:"/resource/amsorry.gif",
      alt:"\"Am sorry\"",
      audio:"/resource/amsorry.mp3",
      header:"Could i be searching anymore words..",
      meta:"\"I am sorry\"",
      description:"Check your luck in goooglee"
    },
    3:{
      id:3,
      content:"friends_monica",
      gif:"/resource/tneaw.gif",
      alt:"Thats not even a word",
      audio:"/resource/tneaw.mp3",
      header:"Who are you kidding.",
      meta:"\"I know..\"other definitions,but not this one...",
      description:"Take my advice, Plz go find it in google"
    }
  }
};

const dataReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        words: action.payload.data,
      };
    case SET_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
