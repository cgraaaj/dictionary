import React from "react";
import { Link } from "react-router-dom";
import GAuth from "../GAuth";

class Header extends React.Component {
  render() {
    return (
      <div className="ui secondary  menu">
        <Link to="/books" className="item">
          Books
        </Link>
        <Link to="/" className="item">
          Dictionary
        </Link>

        <div className="right menu">
          <GAuth />
        </div>
      </div>
    );
  }
}

export default Header;
