import React, { Component } from 'react';
import UserPicture from './UserPicture';
import { CircleLoader } from 'react-spinners';

class LoginRedirect extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="signin">
        <div className="signinItem">
          <CircleLoader />
          Please wait!
        </div>
      </div>
    );
  }
}

export default LoginRedirect;
