import axios from "axios";

// export const dictAPI = axios.create({
//   // baseURL: 'https://mashape-community-urban-dictionary.p.rapidapi.com',
//   baseURL: "https://www.dictionaryapi.com/api/v3/references/",
// });

const { REACT_APP_DICTIONARY_API, REACT_APP_WORDTRACKER_API } = process.env

export const GbookAPI = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
});

export const dictionaryAPI = axios.create({
  baseURL: REACT_APP_DICTIONARY_API,
});

export const wordTrackerAPI = axios.create({
  baseURL: REACT_APP_WORDTRACKER_API
});
