import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { subscribeToTimer } from './socket-io-client/connection';
import Users from './components/Users';
import MessageLayout from './components/MessageLayout';

export default class App extends React.Component {
  constructor(props) {
    super(props);
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
        <div>
          <Route exact path="/messages" component={MessageLayout} />
          <Route exact path="/users" component={Users} />
        </div>
      </HashRouter>
    );
  }
}
