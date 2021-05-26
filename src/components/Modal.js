import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

class Modal extends React.Component {
  renderSynonyms = (synonyms) =>
    synonyms.map((synonym, i) => {
      return (
        <div className="item" key={i}>
          {synonym}
        </div>
      );
    });

  render() {
    console.log(this.props);
    return ReactDOM.createPortal(
      <div
        className="ui dimmer modals visible active"
        onClick={this.props.onDismiss}
      >
        <div
          className="ui standard modal visible active"
          onClick={(e) => e.stopPropagation()}
        >
          <i className="close icon" onClick={this.props.onDismiss}></i>
          {this.props.example ? (
            <React.Fragment>
              <div className="header">Example</div>
              <div className="content">{this.props.example}</div>
            </React.Fragment>
          ) : null}
          {this.props.synonyms ? (
            <React.Fragment>
              <div className="header">Synonyms</div>
              <div className="scrolling content">
                <div className="ui bulleted list">
                  {this.renderSynonyms(this.props.synonyms)}
                </div>
              </div>
            </React.Fragment>
          ) : null}
        </div>
      </div>,
      document.querySelector("#modal")
    );
  }
}

const mapStateToProps = (state) => {
  return { };
};

export default connect(mapStateToProps, { })(Modal);
