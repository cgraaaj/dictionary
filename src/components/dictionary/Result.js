import React from "react";

import WordList from "./WordList";
import Audio from "./Audio";

const Result = ({ words, audio, sword }) => {
  return words.length > 0 ? (
    <div>
      <Audio audio={audio} sword={sword} />
      <div className="five wide column">
        <WordList words={words} sword={sword} />
      </div>
    </div>
  ) : (
    <div>
      <Audio audio={audio} sword={sword} />
      <img
        src="https://66.media.tumblr.com/20d9f53297a8984a7455d6f5bc336c58/e05115941f982421-ff/s500x750/72493d1229f97a31dddb0fb58a391724cb3e2609.gif"
        alt="thats not even a word"
      ></img>
    </div>
  );
};

export default Result;
