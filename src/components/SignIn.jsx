import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class SignIn extends Component {
  constructor(props, context) {
    super(props, context);

    this.onSignInClick = this.onSignInClick.bind(this);
  }

  onSignInClick() {
    fetch('http://localhost:3000/login');
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
