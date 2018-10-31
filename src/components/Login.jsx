import React, { Component } from 'react';

import {
  emitStatusUpdate,
  onStatusUpdate
} from '../socket-io-client/messageToServer';

import { connect } from 'react-redux';

import LoginRedirect from './LoginRedirect';
import SignIn from './SignIn';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null
    };

    this.renderLoginComponent = this.renderLoginComponent.bind(this);
  }

  renderLoginComponent() {
    if (this.state.auth) {
      return <LoginRedirect auth={this.state.auth} />;
    } else {
      return <SignIn />;
    }
  }

  render() {
    return (
      <div className="container h-100" style={{ height: '100%' }}>
        {this.renderLoginComponent()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Login);
