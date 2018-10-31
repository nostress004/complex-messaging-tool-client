import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import { onSignIn, emitSignIn } from '../socket-io-client/messageToServer';

class SignIn extends Component {
  constructor(props, context) {
    super(props, context);

    if (this.props && this.props.fetchUser) {
      //onSignIn(this.props.fetchUser);
    }
    this.onSignInClick = this.onSignInClick.bind(this);
  }

  onSignInClick() {
    fetch('http://localhost:3000/login');
    //emitSignIn();
  }

  render() {
    return (
      <div className="signin">
        <button
          className="signinItem btn btn-outline-danger btn-block"
          onClick={this.onSignInClick}
        >
          Sign in with Google
        </button>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  {
    fetchUser
  }
)(SignIn);
