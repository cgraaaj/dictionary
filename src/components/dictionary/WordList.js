import React from "react";
import { connect } from "react-redux";

import MeaningList from "./MeaningList";
import Audio from "./Audio";

class WordList extends React.Component {
  renderedList=(words) => words.map((word, i) => {
    return (
      <div className="item" key={i}>
        <div className="ui large horizontal divided list">
          <div className="item">
            <Audio phonetics={word.phonetics}/>
          </div>
          <div className="item">
            <div className="content">
              <div className="header">{word.word}</div>
            </div>
          </div>
        </div>
        <MeaningList meanings={word.meanings} word={word.word} phonetic={word.phonetics[0]}/>
      </div>
    );
  });

  render() {
    return (
      <div className="ui relaxed list">
        <div>{this.renderedList(this.props.words)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { words: state.data.words};
};

export default connect(mapStateToProps, { })(WordList);
