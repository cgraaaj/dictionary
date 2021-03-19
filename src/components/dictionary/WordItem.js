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

  onClickWordCard = () => {
    var word = {
      date_time: new Date()
        .toLocaleString("en-GB", { hour12: false })
        .replace(/ /g, ""),
      search_word: this.props.sword,
      audioURL: this.props.audioURL,
      definitions: this.props.word.shortdef,
    };
    this.props.setDefinition(this.props.book, word, this.props.user.uid);
  };

  render() {
    return (
      <div className="card">
        <div className="content" onClick={this.onClickWordCard}>
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
    book: state.books.selectedBook,
    sword: state.data.sword,
    audioURL: state.data.audio,
    user: {
      uid: state.gAuth.uid,
      name: state.gAuth.name,
      email: state.gAuth.email,
    },
  };
};

export default connect(mapStateToProps, { setDefinition })(WordItem);
