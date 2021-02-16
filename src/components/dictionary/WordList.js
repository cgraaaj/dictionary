import React from "react";
import WordItem from "./WordItem";

const WordList = ({ words, sword }) => {
  const renderedList = words.map((word) => {
    if (word.meta.id.includes(sword.toLowerCase())) {
      return <WordItem key={word.meta.uuid} word={word} />;
    }
    return null;
  });
  return (
    <div>
      <div className="ui cards ui">{renderedList}</div>
    </div>
  );
};

export default WordList;
