import React from "react";
import { connect } from "react-redux";
import _, { get } from "lodash";

import { fetchBooks } from "../../actions/index";
class BookList extends React.Component {
  // componentDidMount() {
  //   this.getBooks();
  // }

  // getBooks() {
  //   return this.props.isSignedIn ? (
  //     this.props.fetchBooks(3, this.props.token.access_token)
  //   ) : (
  //     <h3>LOGIN TO VIEW BOOKS</h3>
  //   );
  // }

  renderList() {
    return this.props.books.items.map((item) => {
      return (
        <div className="item" key={item.id}>
          <div className="content">
            <div className="description">
              <div className="ui grid">
                <div className="four wide column">
                  <img
                    className="ui avatar image"
                    src={item.volumeInfo.imageLinks.smallThumbnail}
                    alt={item.volumeInfo.title}
                  />
                </div>
                <div className="six wide column">
                  <h2>{item.volumeInfo.title}</h2>
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
    books: state.books,
  };
};
export default connect(mapsStateToProps, { fetchBooks })(BookList);
