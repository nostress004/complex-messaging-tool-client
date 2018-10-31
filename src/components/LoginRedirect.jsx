import React, { Component } from 'react';
import UserPicture from './UserPicture';

class LoginRedirect extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="signin">
        <div className="signinItem">
          <UserPicture picture={true} className="signinPicture" />{' '}
          <p className="sigInText">Welcome back {this.props.auth.name}!</p>
        </div>
      </div>
    );
  }
}

export default LoginRedirect;
