import React from "react";
import { connect } from "react-redux";

import WordList from "./WordList";
import Audio from "./Audio";

class Result extends React.Component {
  
  render() {
    return this.props.words.length > 0 ? (
      <div>
        <div className="five wide column">
          <WordList/>
        </div>
      </div>
    ) : (
      <div>
        <div className="ui large horizontal divided list">
          <div className="item">
            <Audio phonetics={[]}/>
          </div>
          <div className="item">
            <div className="content">
              <div className="header">{this.props.words.term}</div>
            </div>
          </div>
        </div>
        <div className="ui card centered">
          <div className="image">
            <img src="/resource/tneaw.gif" alt="thats not even a word"></img>
          </div>
          <div className="content">
            <div className="header">Brah... R U Kidding me</div>
            <div className="meta">
              <span className="date">No Definitions Found</span>
            </div>
            <div className="description">
              Let me tell you a secret, better search in Google
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { words:state.data.words};
};

export default connect(mapStateToProps, {  })(Result);
