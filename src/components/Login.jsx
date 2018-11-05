import React, { Component } from 'react';
import SignIn from './SignIn';

class Login extends Component {
  render() {
    return (
      <div className="container h-100" style={{ height: '100%' }}>
        <SignIn />
      </div>
    );
  }
}

export default Login;
