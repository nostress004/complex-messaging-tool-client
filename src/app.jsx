import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Users from './components/Users';
import MessageFlexBoxLayout from './components/MessageFlexBoxLayout';

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
        <div className="main">
          <Route exact path="/messages" component={MessageFlexBoxLayout} />
          <Route exact path="/users" component={Users} />
        </div>
      </HashRouter>
    );
  }
}
