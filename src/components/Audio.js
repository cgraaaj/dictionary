import React from "react";

const Audio = ({ audio, sword }) => {
  const playAudio = () => {
    const audioEl = document.getElementById("audio-element");
    audioEl.play();
  };

  const getAudio = () => {
    if (audio.startsWith("bix")) {
      return "bix";
    } else if (audio.startsWith("gg")) {
      return "gg";
    } else if (!!audio.match(/^[.,!?:]/) || !!audio.match(/^[0-9]/)) {
      return "number";
    } else {
      return audio.charAt(0);
    }
  };

  return audio !== "" ? (
    <div className="ui eight column grid">
      <audio
        id="audio-element"
        src={`https://media.merriam-webster.com/audio/prons/en/us/mp3/${getAudio()}/${audio}.mp3`}
      ></audio>
      <div className="column">
        <i className="volume up icon" onClick={playAudio}></i>
      </div>
      <div className="column">{sword}</div>
    </div>
  ) : null;
};

export default Audio;
