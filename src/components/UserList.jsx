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

    this.getOnlineUsers = this.getOnlineUsers.bind(this);
    this.getOfflineUsers = this.getOfflineUsers.bind(this);
  }

  getOnlineUsers() {
    return this.props.userList && this.props.userList.length;
  }

  getOfflineUsers() {
    debugger;
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
          <u>Available {this.getOnlineUsers()}</u>
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
          <li>
            <b>Jane </b>- <i>Listening to music</i>
          </li>
          <li>
            <b>Suzan</b>
          </li>
          <li>
            <b>Kane </b>- <i>Away</i>
          </li>
          <li>
            <b>James</b>
          </li>
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
          <li>Darell</li>
          <li>Olga</li>
          <li>Ben</li>
          <li>Csaba</li>
          <li>Nick</li>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ userList }) {
  return { userList };
}

export default connect(
  mapStateToProps,
  { fetchUsers }
)(UserList);
