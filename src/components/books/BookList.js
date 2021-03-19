import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchBooks, selectBook } from "../../actions/index";
class BookList extends React.Component {
  renderList() {
    return this.props.books.items.map((item) => {
      return (
        <div className="item" key={item.id}>
          <div className="content">
            <div className="description">
              <div
                className="ui grid"
                onClick={() => {
                  console.log(`${item.volumeInfo.title} has been selected`);
                  const id = item.volumeInfo.industryIdentifiers[1].identifier;
                  const name = item.volumeInfo.title;
                  this.props.selectBook(id, name);
                }}
              >
                <div className="four wide column">
                  <img
                    className="ui avatar image"
                    src={
                      item.volumeInfo.hasOwnProperty("imageLinks")
                        ? item.volumeInfo.imageLinks.smallThumbnail
                        : null
                    }
                    alt={item.volumeInfo.title}
                  />
                </div>
                <div className="six wide column">
                  <h2>
                    <a
                      style={{ display: "table-cell" }}
                      href={item.volumeInfo.infoLink}
                      target="_blank"
                    >
                      {item.volumeInfo.title}
                    </a>
                  </h2>
                </div>
                <div className="four wide column">
                  <h3>{item.volumeInfo.authors[0]}</h3>
                </div>
              </div>

              <p>{item.volumeInfo.description}</p>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ui relaxed divided list">
        {!_.isEmpty(this.props.books) ? (
          this.renderList()
        ) : (
          <h3>LOGIN TO VIEW BOOKS</h3>
        )}
      </div>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
    isSignedIn: state.gAuth.isSignedIn,
    token: state.gAuth.authRespose,
    books: state.books.books,
    selectedBook: state.books.selectBook,
    isDefinitionSet: state.books.isDefinitionSet,
  };
};
export default connect(mapsStateToProps, { fetchBooks, selectBook })(BookList);
