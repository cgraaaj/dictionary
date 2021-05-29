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
    console.log(this.props.card)
    return (
      <div>
        {!_.isEmpty(this.props.phonetics) ? (
          this.renderAudio(this.props.phonetics)
        ) : (
          <div className="ui column grid">
            <audio id={this.props.card.id} src={this.props.card.audio}></audio>
            <div className="column">
              <i
                className="volume up icon"
                onClick={() => {
                  document.getElementById(this.props.card.id).play();
                }}
              ></i>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapsStateToProps = (state,ownProps) => {
  if(ownProps.cardId){
  return { card:state.data.cards[ownProps.cardId]};
  }
  return {...state}
};

export default connect(mapsStateToProps, {})(Audio);
