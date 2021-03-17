import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import BookCreate from "./books/BookCreate";
import BookEdit from "./books/BookEdit";
import BookDelete from "./books/BookDelete";
import BookShow from "./books/BookShow";
import BookList from "./books/BookList";
import WordList from "./wordTracker/WordList";

import SearchBar from "./dictionary/SearchBar";
import Header from "./Header";

// https://media.merriam-webster.com/audio/prons/en/us/mp3/f/fucker01.mp3,

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={SearchBar}></Route>
          <Route path="/books" component={BookList}></Route>
          <Route path="/add_book" component={BookCreate}></Route>
          <Route path="/word_tracker" component={WordList}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
