import React, { Component } from 'react';

import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import {
  onClients,
  onFriendSignIn,
  onFriendSignOut
} from '../socket-io-client/messageToServer';
import { fetchUsers, fetchFriendSignIn, fetchFriendSignOut } from '../actions';

class UserList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      availableOpen: true,
      offlineOpen: true,
      updateDialog: ''
    };

    onClients(this.props.fetchUsers);
    onFriendSignIn(this.props.fetchFriendSignIn);
    onFriendSignOut(this.props.fetchFriendSignOut);

    this.getUsers = this.getUsers.bind(this);
    this.setNotificationbar = this.setNotificationbar.bind(this);
    this.onMessageUserClick = this.onMessageUserClick.bind(this);
  }

  onMessageUserClick(event) {
    var recipient = this.props.auth.contacts.find(c => {
      return c._doc.email === event.target.getAttribute('value');
    });
    if (this.props.auth || recipient) {
      ipcRenderer.send('messageUser', this.props.auth, recipient);
    } else {
      this.setNotificationbar('Could not open message window');
    }
  }

  setNotificationbar(message) {
    this.setState({ updateDialog: message });
    setTimeout(
      function() {
        this.setState({ updateDialog: '' });
      }.bind(this),
      2500
    );
  }

  getUsers(status) {
    let users = this.props.userList && this.props.userList[status + 'Users'];
    let renderedContent = [];

    if (!users || !users.length) {
      return <div>There aren't any {status} users at this time! </div>;
    }

    users.map((user, index) => {
      //if (user.email !== this.props.auth.email) {
      renderedContent.push(
        <li key={index} style={{ listStyleType: 'none' }}>
          <button
            className="btn btn-sm btn-success"
            style={{
              paddingRight: 0,
              marginRight: 5,
              marginLeft: 5
            }}
          />
          <img
            className="card-img-left col-4 profile_picture rounded"
            src={this.props.auth.photo}
            alt="Google picture"
            style={{
              borderStyle: 'solid',
              background: 'white',
              width: '10%',
              padding: 0,
              marginRight: 5
            }}
          />

          <b
            value={user.email}
            style={{ cursor: 'pointer' }}
            onClick={this.onMessageUserClick}
          >
            {user.name}:{' '}
          </b>
          <i>{user.email}</i>
        </li>
      );
      //}
    });

    return renderedContent.length ? (
      renderedContent
    ) : (
      <div>There aren't any {status} users at this time! </div>
    );
  }

  getUpdateDialog() {
    if (this.state.updateDialog) {
      return (
        <div
          style={{
            background: 'tomato',
            margin: 5
          }}
        >
          {this.state.updateDialog}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.getUpdateDialog()}
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
  { fetchUsers, fetchFriendSignIn, fetchFriendSignOut }
)(UserList);
