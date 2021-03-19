import React from "react";
import { connect } from "react-redux";

import { fetchData, searchTerm } from "../../actions/index";
import Result from "./Result";

class SearchBar extends React.Component {
  componentDidMount() {
    this.props.fetchData(this.props.term.sterm);
  }
  onInputChange = (event) => {
    this.props.searchTerm(event.target.value);
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.fetchData(this.props.term.sterm);
  };

  render() {
    return (
      <div className="ui container">
        <h2>
          {this.props.selectedBook
            ? this.props.selectedBook.name
            : "No Book Selected"}
        </h2>
        <div className="search-bar ui segment">
          <form className="search-bar ui form" onSubmit={this.onFormSubmit}>
            <div className="field"></div>
            <label>Search</label>
            <input
              onChange={this.onInputChange}
              type="text"
              value={this.props.term.sterm}
              placeholder="Search..."
            />
          </form>
        </div>
        <Result words={this.props.data.words} sword={this.props.data.sword} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state, selectedBook: state.books.selectedBook };
};

export default connect(mapStateToProps, { fetchData, searchTerm })(SearchBar);
