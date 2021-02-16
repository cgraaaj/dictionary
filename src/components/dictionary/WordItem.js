import React from 'react';

const WordItem = ({ word }) => {
   const renderShortDef = word.shortdef.map((shortdef, i) => {
      return (
         <div className="item" key={i}>
            {shortdef}
         </div>
      );
   });

   return (
      <div className="card">
         <div className="content">
         <div className="header">{word.meta.id}</div>
            <div className="meta">{word.fl}</div>
            <div className="description">
               <div className="ui bulleted list">{renderShortDef}</div>
            </div>
         </div>
      </div>
   );
};

export default WordItem;
