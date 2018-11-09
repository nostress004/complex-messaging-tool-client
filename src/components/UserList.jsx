import React, { Component } from 'react';

import { connect } from 'react-redux';
import { onClients } from '../socket-io-client/messageToServer';
import { fetchUsers } from '../actions';

class UserList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      availableOpen: true,
      offlineOpen: true
    };

    onClients(this.props.fetchUsers);

    this.getUsers = this.getUsers.bind(this);
  }

  getUsers(status) {
    let users = this.props.userList && this.props.userList[status + 'Users'];
    let renderedContent = [];

    if (!users || !users.length) {
      return <div>There aren't any {status} users at this time! </div>;
    }

    users.map((user, index) => {
      if (user.email !== this.props.auth.email) {
        renderedContent.push(
          <li key={index}>
            <b>{user.name}: </b>
            <i>{user.email}</i>
          </li>
        );
      }
    });

    return renderedContent.length ? (
      renderedContent
    ) : (
      <div>There aren't any {status} users at this time! </div>
    );
  }

  render() {
    return (
      <div>
        <div
          className="rounded"
          onClick={() =>
            this.setState({ availableOpen: !this.state.availableOpen })
          }
          style={{
            background: 'lightgreen',
            borderStyle: 'solid',
            padding: 0,
            marginTop: 5,
            paddingLeft: 5
          }}
        >
          <u>Available</u>
        </div>
        <br />
        <div
          id="collapsible-panel-example-1"
          hidden={this.state.availableOpen}
          style={{
            paddingLeft: 15,
            paddingBottom: 15
          }}
        >
          {this.getUsers('online')}
        </div>
        <div
          className="rounded"
          onClick={() =>
            this.setState({ offlineOpen: !this.state.offlineOpen })
          }
          style={{
            background: 'tomato',
            borderStyle: 'solid',
            paddingLeft: 5
          }}
        >
          <u>Offline</u>
        </div>
        <br />
        <div
          id="collapsible-panel-example-1"
          hidden={this.state.offlineOpen}
          style={{
            paddingLeft: 15,
            paddingTop: 0,
            color: 'gray'
          }}
        >
          {this.getUsers('offline')}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ userList, auth }) {
  return { userList, auth };
}

export default connect(
  mapStateToProps,
  { fetchUsers }
)(UserList);
