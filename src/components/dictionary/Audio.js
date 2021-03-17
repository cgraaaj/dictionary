import React from "react";
import { connect } from "react-redux";

import { setAudioURL } from "../../actions/index";

class Audio extends React.Component {
  playAudio() {
    const audioEl = document.getElementById("audio-element");
    audioEl.play();
  }

  render() {
    return this.props.audio !== "" ? (
      <div className="ui eight column grid">
        <audio id="audio-element" src={this.props.audio}></audio>
        <div className="column">
          <i className="volume up icon" onClick={this.playAudio}></i>
        </div>
        <div className="column">{this.props.search_word}</div>
      </div>
    ) : null;
  }
}

const mapsStateToProps = (state) => {
  return { audio: state.data.audio, search_word: state.data.sword };
};

export default connect(mapsStateToProps, { setAudioURL })(Audio);
