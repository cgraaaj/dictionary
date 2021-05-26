import React from "react";
import WordItem from "./WordItem";

const MeaningList = ({ meanings, word, phonetic}) => {
  const renderedList = meanings.map((meaning,i) => {
      return <WordItem key={i} meaning={meaning} word={word} phonetic={phonetic}/>; 
  });
  return (
    <div>
      <div className="ui cards ui">{renderedList}</div>
    </div>
  );
};

export default MeaningList;
