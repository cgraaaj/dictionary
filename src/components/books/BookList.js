import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchBooks, selectBook } from "../../actions";
class BookList extends React.Component {
  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.fetchBooks(3);
    }
  }

  renderList() {
    return this.props.books.map((book) => {
      return (
        <div className="item" key={book.isbn_13}>
          <div className="content">
            <div className="description">
              <div
                className="ui grid"
                onClick={() => {
                  console.log(`${book.title} has been selected`);
                  const _id = book._id;
                  const isbn_13 = book.isbn_13;
                  const title = book.title;
                  this.props.selectBook(_id, isbn_13, title);
                }}
              >
                <div className="three wide column">
                  <img
                    className="ui tiny rounded image"
                    src={book.image_url}
                    alt={book.title}
                  />
                </div>
                <div className="thirteen wide column">
                  <div className="ui relaxed divided list">
                    <div className="item">
                      <h2>
                        <a
                          style={{ display: "table-cell" }}
                          href={book.info}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {book.title}
                        </a>
                      </h2>
                    </div>
                    <div className="item">
                      <h3>{book.authors[0]}</h3>
                    </div>
                    <div className="item">
                      <p>{book.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    if (this.props.isSignedIn) {
      console.log(this.props)
      if (this.props.books.length > 0) {
        return (
          <div className="ui relaxed divided list">{this.renderList()}</div>
        );
      }
      return <h3>LOADING BOOKS</h3>;
    }
    return (
      <div className="ui tthree column centered grid">
        <div className="column">
          <h3>LOGIN TO VIEW BOOKS</h3>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
    isSignedIn: state.gAuth.isSignedIn,
    books: Object.values(state.books.books),
  };
};
export default connect(mapsStateToProps, { fetchBooks, selectBook })(BookList);
