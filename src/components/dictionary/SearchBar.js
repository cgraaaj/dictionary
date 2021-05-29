import React from "react";
import { connect } from "react-redux";

import { fetchData, setModal, searchTerm } from "../../actions";
import Result from "./Result";
import Modal from "../Modal";
import { Form, Field } from "react-final-form";

class SearchBar extends React.Component {
  // check why form word not persist 
  componentDidMount() {
    this.props.fetchData(this.props.term);
  }

  onFormSubmit = ({ word }) => {
    this.props.fetchData(word);
    //using another state to keeptrack of the searched word if page component changes
    // this.props.searchTerm(word);
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="header" style={{ color: "#9f3a38" }}>
          {error}
        </div>
      );
    }
  }

  validate = (formValues) => {
    const errors = {};
    if (!formValues.word) {
      errors.word = "Dobby would need something to search, Sir/Madam...";
    }
    return errors;
  };

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : " "}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    return (
      <div className="ui container">
        <h2>
          {this.props.selectedBook
            ? this.props.selectedBook.title
            : "No Book Selected"}
        </h2>
        <div className="ui segment">
          <Form
            onSubmit={this.onFormSubmit}
            initialValues={this.props.initialValues}
            validate={this.validate}
            render={({ handleSubmit }) => (
              <form
                className="ui form error"
                onSubmit={handleSubmit}
              >
                <Field
                  name="word"
                  component={this.renderInput}
                  label="Search"
                />
              </form>
            )}
          />
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
    initialValues: { word: state.term.sterm },
  };
};

export default connect(mapStateToProps, { fetchData, setModal, searchTerm })(
  SearchBar
);
