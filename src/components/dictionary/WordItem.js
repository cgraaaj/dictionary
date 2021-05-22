import React from "react";
import { connect } from "react-redux";

import { setDefinition } from "../../actions/index";

class WordItem extends React.Component {
  renderShortDef = this.props.word.shortdef.map((shortdef, i) => {
    return (
      <div className="item" key={i}>
        {shortdef}
      </div>
    );
  });

  onClickWord = () => {
    var wordData = {
      search_word: this.props.sword.toLowerCase(),
      audio_url: this.props.audioURL,
      definitions: this.props.word.shortdef,
    };
    this.props.setDefinition(wordData);
  };

  render() {
    return (
      <div className="card">
        <div className="content" onClick={this.onClickWord}>
          <div className="header">{this.props.word.meta.id}</div>
          <div className="meta">{this.props.word.fl}</div>
          <div className="description">
            <div className="ui bulleted list">{this.renderShortDef}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sword: state.data.sword,
    audioURL: state.data.audio,
  };
};

export default connect(mapStateToProps, { setDefinition })(WordItem);
