import React from "react";
import { connect } from "react-redux";

import WordList from "./WordList";
import Audio from "./Audio";

class Result extends React.Component {
  render() {
    return this.props.words.length > 0 ? (
      <div>
        <div className="five wide column">
          <WordList />
        </div>
      </div>
    ) : (
      <div>
        <div className="ui large horizontal divided list">
          <div className="item">
            <Audio phonetics={[]} cardId={this.props.cardId}/>
          </div>
          <div className="item">
            <div className="content">
              <div className="header">{this.props.words.term}</div>
            </div>
          </div>
        </div>
        <div className="ui card centered">
          <div className="image">
            <img src={this.props.card.gif} alt={this.props.card.alt}></img>
          </div>
          <div className="content">
            <div className="header">{this.props.card.header}</div>
            <div className="meta">{this.props.card.meta}</div>
            <div className="description">{this.props.card.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let cardId = Math.floor(
    Math.random() * (Object.keys(state.data.cards).length - 1 + 1) + 1
  );
  return {
    words: state.data.words,
    cardId,
    card: state.data.cards[cardId],
  };
};

export default connect(mapStateToProps, {})(Result);
