import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import { CircleLoader } from 'react-spinners';
import UserCard from './UserCard';
import UserPicture from './UserPicture';
import Messages from './Messages';
import TextArea from './TextArea';
import { fetchConversation } from '../actions';
import {
  emitConversationInit,
  onConverstationInitalized
} from '../socket-io-client/messageToServer';

class MessageLayout extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { loadHistory: false };
    this.getPicture = this.getPicture.bind(this);
    this.getMessages = this.getMessages.bind(this);
    this.conversationInitialized = this.conversationInitialized.bind(this);
    this.onNudgeClick = this.onNudgeClick.bind(this);

    onConverstationInitalized(this.conversationInitialized);
  }

  getPicture() {
    return (
      (this.props && this.props.auth && this.props.auth.photo) ||
      'https://c.tribune.com.pk/2017/03/1356933-msn-1489661345-517-640x480.jpg'
    );
  }

  componentDidUpdate() {
    if (!this.props.conversation) {
      return;
    }
    if (!this.props.conversation.recipient) {
      return;
    }

    if (!this.props.conversation.messages) {
      debugger;
      emitConversationInit(this.props.conversation.recipient);
    }
  }

  conversationInitialized(client) {
    this.setState({ loadHistory: false });
    this.props.fetchConversation(client);
  }

  getMessages() {
    if (this.state.loading) {
      return <CircleLoader />;
    } else {
      return <Messages />;
    }
  }

  onNudgeClick(event) {
    ipcRenderer.send('nudgeWindow');
  }

  render() {
    const recipient =
      this.props &&
      this.props.conversation &&
      this.props.conversation.recipient;
    return (
      <div className="messages-main vertical-container">
        <div className="function-container" style={{ padding: 10 }}>
          <div className="function-box">
            <button
              className="btn btn-outline-primary btn-block"
              onClick={this.onNudgeClick}
            >
              Nudge
            </button>
          </div>
          <div className="function-box">
            <button className="btn btn-outline-success btn-block">
              View Userlist
            </button>
          </div>
          <div className="function-box">
            <button className="btn btn-outline-danger btn-block">
              Exit conversation
            </button>
          </div>
        </div>
        <div className="input-container user-height">
          <div className="input-box-1">
            <UserPicture
              picture={true}
              src={recipient && recipient.photo}
              size={200}
            />
          </div>
          <div className="input-box-2">
            <UserCard
              name={recipient && recipient.name}
              email={recipient && recipient.email}
              status={recipient && recipient.status}
            />
          </div>
        </div>
        <div className="input-container message-height">
          <div className="input-box-1" />
          <div className="message-box">
            <Messages />
          </div>
        </div>
        <div className="input-container user-height">
          <div className="input-box-1">
            <UserPicture
              picture={true}
              src={this.props.auth && this.props.auth.photo}
              size={300}
            />
          </div>
          <div className="input-box-2" style={{ height: '60%' }}>
            <TextArea picture={false} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, conversation }) {
  return { auth, conversation };
}

export default connect(
  mapStateToProps,
  { fetchConversation }
)(MessageLayout);
