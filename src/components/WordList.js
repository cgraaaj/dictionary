import React from 'react';
import WordItem from './WordItem';

const WordList = ({ words }) => {
   const renderedList = words.map((word) => {
      return <WordItem key={word.meta.uuid} word={word} />;
   });
   return (
      <div>
         {/* <div className="ui relaxed divided list">{renderedList}</div> */}
         <div className="ui cards ui">{renderedList}</div>
      </div>
   );
};

export default WordList;
