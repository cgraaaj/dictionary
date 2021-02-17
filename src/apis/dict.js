import axios from "axios";

export const dict = axios.create({
  // baseURL: 'https://mashape-community-urban-dictionary.p.rapidapi.com',
  baseURL: "https://www.dictionaryapi.com/api/v3/references/",
});

export const book = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
});
