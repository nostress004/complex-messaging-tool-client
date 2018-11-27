import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import {
  onClients,
  onFriendSignIn,
  onFriendSignOut,
  onUserListError,
  emitConversationInit,
  onNewConversationRequest,
  onConverstationInitalized
} from '../socket-io-client/messageToServer';
import {
  fetchUsers,
  fetchFriendSignIn,
  fetchFriendSignOut,
  fetchConversation
} from '../actions';

class UserList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      availableOpen: true,
      offlineOpen: true,
      updateDialog: '',
      messageRequest: null
    };

    this.getUsers = this.getUsers.bind(this);
    this.setNotificationbar = this.setNotificationbar.bind(this);
    this.onMessageUserClick = this.onMessageUserClick.bind(this);
    this.friendSignIn = this.friendSignIn.bind(this);
    this.friendSignOut = this.friendSignOut.bind(this);
    this.newConversationRequest = this.newConversationRequest.bind(this);
    this.conversationInitialized = this.conversationInitialized.bind(this);
    this.getMessageRequest = this.getMessageRequest.bind(this);

    onClients(this.props.fetchUsers);
    onFriendSignIn(this.friendSignIn);
    onFriendSignOut(this.friendSignOut);
    onUserListError(this.setNotificationbar);
    onNewConversationRequest(this.newConversationRequest);
    onConverstationInitalized(this.conversationInitialized);
  }

  onMessageUserClick(event) {
    var recipientEmail = event.target.getAttribute('value');
    debugger;
    emitConversationInit(this.props.auth.googleID, recipientEmail);
  }

  conversationInitialized(recipient, conversation) {
    if (this.props.auth && recipient && conversation) {
      let store = { auth: this.props.auth, recipient, conversation };
      ipcRenderer.send('messageUser', store);
    } else {
      this.setNotificationbar('Could not open sendClientsmessage window');
    }
  }

  friendSignIn(client) {
    //if (client.email !== this.props.auth.email) {
    this.setNotificationbar(client.name + ' has logged in!');
    this.props.fetchFriendSignIn(client);
    //}
  }

  friendSignOut(client) {
    if (client.email !== this.props.auth.email) {
      this.setNotificationbar(client.name + ' has logged out!');
      this.props.fetchFriendSignOut(client);
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

  newConversationRequest(fromClient, conversation) {
    if (
      confirm(
        `${fromClient.name} wants to send you a message, do you accept it?`
      )
    ) {
      alert('wohohohooh');
      if (this.props.auth && fromClient && conversation) {
        let store = {
          auth: this.props.auth,
          recipient: fromClient,
          conversation
        };
        ipcRenderer.send('messageUser', store);
      } else {
        this.setNotificationbar('Could not open sendClientsmessage window');
      }
    } else {
      alert('okay:(');
    }
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
        <li key={index} style={{ listStyleType: 'none', paddingTop: 5 }}>
          <button
            className={
              user.status === 'Online'
                ? 'btn btn-sm btn-success'
                : 'btn btn-sm btn-danger'
            }
            style={{
              paddingRight: 0,
              marginRight: 5,
              marginLeft: 5
            }}
            disabled={true}
          />
          <img
            className="card-img-left col-4 profile_picture rounded"
            src={user.photo}
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
            style={{
              cursor: user.status === 'Offline' ? 'default' : 'pointer'
            }}
            onClick={
              user.status === 'Offline' ? () => {} : this.onMessageUserClick
            }
          >
            {user.name.split(' ')[0]}:{' '}
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

  getMessageRequest() {}

  render() {
    return (
      <div>
        {this.getUpdateDialog()}
        {this.getMessageRequest()}
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
  { fetchUsers, fetchFriendSignIn, fetchFriendSignOut, fetchConversation }
)(UserList);
