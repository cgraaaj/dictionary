import axios from "axios";

// export const dictAPI = axios.create({
//   // baseURL: 'https://mashape-community-urban-dictionary.p.rapidapi.com',
//   baseURL: "https://www.dictionaryapi.com/api/v3/references/",
// });

export const GbookAPI = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
});

export const dictionaryAPI = axios.create({
  baseURL: '/dictionaryAPI',
});

export const wordTrackerAPI = axios.create({
  baseURL: '/wordTrackerAPI'
});

