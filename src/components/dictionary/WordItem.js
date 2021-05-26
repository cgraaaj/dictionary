import React from "react";
import { connect } from "react-redux";

import { setDefinition, setModal } from "../../actions/index";

class WordItem extends React.Component {
  
  onClickDefinition=(def)=>e =>{
    const modal = {
      flag:!this.props.modalFlag,
      example:def.example,
      synonyms:def.synonyms
    }
     this.props.setModal(modal)
  }

  renderDefinitions = (definitions) =>
    definitions.map((def, i) => {
      return (
        <div
          className="item"
          key={i}
          onClick={this.onClickDefinition(def)}
          style={{cursor: "pointer"}}
        >
          {def.definition}
        </div>
      );
    });


  onDoubleClickCard = () => {
    var wordData = {
      search_word: this.props.word,
      phonetic: this.props.phonetic,
      partOfSpeech: this.props.meaning.partOfSpeech,
      definitions: this.props.meaning.definitions.map((def) => def.definition),
    };
    this.props.setDefinition(wordData);
  };

  render() {
    return (
      <div className="card">
        <div className="content" onDoubleClick={this.onDoubleClickCard}>
          <div className="header">{this.props.meaning.partOfSpeech}</div>
          <div className="description">
            <div className="ui bulleted list">
              {this.renderDefinitions(this.props.meaning.definitions)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sword: state.data.sword,
    audioURL: state.data.audio,
  };
};

export default connect(mapStateToProps, { setDefinition, setModal })(WordItem);
