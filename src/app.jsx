import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

import * as actions from './actions';
import Users from './components/Users';
import MessageFlexBoxLayout from './components/MessageFlexBoxLayout';
import Login from './components/Login';
import LoginRedirect from './components/LoginRedirect';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.onStoreData = this.onStoreData.bind(this);

    ipcRenderer.on('storeData', (event, store) => {
      this.onStoreData(event, store);
    });
    ipcRenderer.on('createMessagesWindow', (event, store) => {
      this.onCreateMessagesWindow(event, store);
    });
  }

  onStoreData(event, store) {
    this.props.fetchStoreData(store);
  }

  onCreateMessagesWindow(event, store) {
    //this.props.fetchConversation(store.conver);
    this.props.fetchMessageData(store);
  }

  getRoutes() {
    const routes = [
      {
        path: '/users',
        component: Users
      },
      {
        path: '/messages',
        component: Messages
      }
    ];
  }

  render() {
    return (
      <HashRouter>
        <div className="main">
          <Route exact path="/login" component={Login} />
          <Route exact path="/messages" component={MessageFlexBoxLayout} />
          <Route
            exact
            path="/users"
            component={this.props && this.props.auth ? Users : LoginRedirect}
          />
        </div>
      </HashRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(App);
