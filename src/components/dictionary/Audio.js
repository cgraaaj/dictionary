import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

class Audio extends React.Component {
  renderAudio = (phonetics) =>
    phonetics.map((phonetic, i) => (
      <div className="ui column grid" key={i}>
        <audio id={phonetic.text} src={phonetic.audio}></audio>
        <div className="column">
          <i
            className="volume up icon"
            onClick={() => {
              document.getElementById(phonetic.text).play();
            }}
          ></i>
        </div>
        <div className="column">{phonetic.text}</div>
      </div>
    ));

  render() {
    return (
      <div>
        {!_.isEmpty(this.props.phonetics) ? (
          this.renderAudio(this.props.phonetics)
        ) : (
          <div className="ui column grid">
            <audio id="tneaw" src="/resource/tneaw.mp3"></audio>
            <div className="column">
              <i
                className="volume up icon"
                onClick={() => {
                  document.getElementById("tneaw").play();
                }}
              ></i>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapsStateToProps = (state) => {
  return { ...state };
};

export default connect(mapsStateToProps, {})(Audio);
