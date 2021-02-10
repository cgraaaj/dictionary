import React from "react";
import SearchBar from "./SearchBar";

import dict from "../apis/dict";
import Result from "./Result";
// https://media.merriam-webster.com/audio/prons/en/us/mp3/f/fucker01.mp3,

class App extends React.Component {
  state = {
    words: [],
    sword: "",
    audio: "",
  };

  componentDidMount() {
    this.onTermSubmit("Raj Lincoln");
  }

  onTermSubmit = async (term) => {
    const response = await dict.get(
      // `/thesaurus/json/${term}?key=51d55996-3ce3-4260-8603-2f14f419e7e3`,
      // `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${term}?key=51d55996-3ce3-4260-8603-2f14f419e7e3`,
      `/collegiate/json/${term}?key=ee2768a1-8b8e-4617-a361-9072d8efc137`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (!response.data[0].hasOwnProperty("meta")) {
      this.setState({
        words: "",
      });
    } else {
      this.setState({
        words: response.data,
        sword: term,
        audio: response.data[0].hwi.hasOwnProperty("prs")
          ? response.data[0].hwi.prs[0].sound.audio
          : "",
      });
    }
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit}></SearchBar>
        <Result
          words={this.state.words}
          audio={this.state.audio}
          sword={this.state.sword}
        />
      </div>
    );
  }
}

export default App;
