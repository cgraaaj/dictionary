import React from "react";
import { connect } from "react-redux";

class WordItem extends React.Component {
  renderShortDef = this.props.word.definitions.map((shortdef, i) => {
    return (
      <div className="item" key={i}>
        {shortdef}
      </div>
    );
  });

  onClickWord = () => {};

  render() {
    return (
      <div className="card">
        <div className="content" onClick={this.onClickWord}>
          <div className="header">
            <div className="ui grid">
              <div className="thirteen wide column">
                {this.props.word.search_word}
              </div>
              <div className="three wide column">
                <i className="edit outline icon"></i>
              </div>
            </div>
          </div>
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
    state,
  };
};

export default connect(mapStateToProps, {})(WordItem);
