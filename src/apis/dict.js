import axios from "axios";

export const dictAPI = axios.create({
  // baseURL: 'https://mashape-community-urban-dictionary.p.rapidapi.com',
  baseURL: "https://www.dictionaryapi.com/api/v3/references/",
});

export const GbookAPI = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
});

export const wordTrackerAPI = axios.create({
  baseURL: "http://192.168.1.67:5000/graphql",
});
