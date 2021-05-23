import React from "react";
import { connect } from "react-redux";

import { signIn, signOut} from "../actions";

class GAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "562645785873-7oh3bo5jlesebqa34hfi00mluhid7hnb.apps.googleusercontent.com",
          scope: "email https://www.googleapis.com/auth/books",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get());
    } else {
      this.props.signOut();
    }
  };

  onClickSignIn = () => {
    this.auth.signIn();
  };

  onClickSignOut = () => {
    this.auth.signOut();
  };

  renderAuth() {
    if (this.props.isSignedIn === null) {
      return (
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui text loader"></div>
          </div>
          <p></p>
        </div>
      );
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui basic button" onClick={this.onClickSignOut}>
          <img
            className="ui avatar image"
            src={this.props.userProp.imageURL}
            alt="image_url"
          />
          Logout
        </button>
      );
    } else {
      return (
        <button className="ui basic button" onClick={this.onClickSignIn}>
          <i className="google icon"></i>
          Login
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuth()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.gAuth.isSignedIn,
    userProp: state.gAuth,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GAuth);
