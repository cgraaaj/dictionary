import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { addBook } from "../../actions";

import { toast } from "react-toastify";

class BookCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    return (
      <div className={`field ${meta.touched && meta.error ? "error" : ""}`}>
        <label>{label}</label>
        <input {...input} autoComplete="off"></input>
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.addBook(formValues);
    console.log(this.props.notify);
    toast(this.props.notify);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="isbn" component={this.renderInput} label="Enter ISBN" />

        <Field
          name="shelf"
          component={this.renderInput}
          label="Enter Shelf No"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.isbn) {
    errors.isbn = "Enter or scan isbn";
  }
  if (!formValues.shelf) {
    errors.shelf = "Enter a shelf number";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "bookCreate",
  validate,
})(BookCreate);

const mapStateToProps = (state) => {
  return { notify: state.notify.message };
};

export default connect(mapStateToProps, { addBook })(formWrapped);
