import React from "react";
import { connect } from "react-redux";

import { fetchData, searchTerm } from "../../actions/index";
import Result from "./Result";
import Modal from "../Modal";
import { setModal } from "../../actions";

class SearchBar extends React.Component {
  componentDidMount() {
    this.props.fetchData(this.props.term);
  }
  onInputChange = (event) => {
    this.props.searchTerm(event.target.value);
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.fetchData(this.props.term);
  };

  render() {
    return (
      <div className="ui container">
        <h2>
          {this.props.selectedBook
            ? this.props.selectedBook.title
            : "No Book Selected"}
        </h2>
        <div className="search-bar ui segment">
          <form className="search-bar ui form" onSubmit={this.onFormSubmit}>
            <div className="field"></div>
            <label>Search</label>
            <input
              onChange={this.onInputChange}
              type="text"
              value={this.props.term}
              placeholder="Search..."
            />
          </form>
        </div>
        <Result />
        {this.props.modal.flag &&
        (this.props.modal.example || this.props.modal.synonyms) ? (
          <Modal
            example={this.props.modal.example}
            synonyms={this.props.modal.synonyms}
            onDismiss={() => {
              this.props.setModal({
                flag: !this.props.modal.flag,
                example: "",
                synonyms: [],
              });
            }}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    term: state.term.sterm,
    selectedBook: state.books.selectedBook,
    modal: state.data.modal,
  };
};

export default connect(mapStateToProps, { fetchData, searchTerm, setModal})(SearchBar);
