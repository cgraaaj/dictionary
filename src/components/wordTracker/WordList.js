import React from "react";
import { connect } from "react-redux";

import { fetchWords } from "../../actions";
import WordItem from "./WordItem";

class WordList extends React.Component {
  componentDidMount() {
    this.props.fetchWords();
  }

  renderedList() {
    return this.props.words.map((word) => {
      return <WordItem key={word._id} word={word} />;
    });
  }

  render() {
    return <div className="ui cards ui">{this.renderedList()}</div>;
  }
}

const mapsStateToProps = (state) => {
  return {
    words: Object.values(state.words.words),
  };
};
export default connect(mapsStateToProps, { fetchWords })(WordList);
