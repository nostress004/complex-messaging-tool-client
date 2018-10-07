import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { subscribeToTimer } from './socket-io-client/connection';
import Messages from './components/Messages';
import Users from './components/Users';

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
          <Route exact path="/messages" component={Messages} />
          <Route exact path="/users" component={Users} />
        </div>
      </HashRouter>
    );
  }
}
