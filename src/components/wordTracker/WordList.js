import React from "react";
import { connect } from "react-redux";

class WordList extends React.Component {
  render() {
    return <div className="ui relaxed divided list">asdf</div>;
  }
}

const mapsStateToProps = (state) => {
  return state;
};
export default connect(mapsStateToProps, {})(WordList);
