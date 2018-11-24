import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { messageToClient } from '../socket-io-client/messageToServer';
import { Emoji } from 'emoji-mart';
import { fetchMessage } from '../actions';

class Messages extends Component {
  constructor(props, context) {
    super(props, context);

    this.messagesEnd = React.createRef();
    this.handleMessage = this.handleMessage.bind(this);
    messageToClient(this.handleMessage);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleMessage(message) {
    debugger;
    this.props.fetchMessage(message);
  }

  getMessages(messages) {
    // @todo: check
    debugger;
    if (!messages || messages.length < 1 || messages[0] === undefined) {
      return <div>There are no messages ATM </div>;
    }

    const arrayOfMessages = messages.map((message, index) => {
      // Only do this if items have no stable IDs
      if (message.type.indexOf('TEXT') === 0) {
        return (
          <div
            style={{
              border: 0,
              margin: 0,
              padding: 0,
              textAlign:
                this.props.auth.name === message.sender ? 'right' : 'left'
            }}
            key={index}
          >
            <div>
              <b>{message.sender} </b>
              <i>({message.date})</i>
            </div>
            {message.content}
          </div>
        );
      }
      if (message.type.indexOf('EMOJI') === 0) {
        return (
          <div
            style={{
              border: 0,
              margin: 0,
              padding: 0,
              textAlign:
                this.props.auth.name === message.sender ? 'right' : 'left'
            }}
            key={index}
          >
            <div>
              <b>{message.sender} </b>
              <i>({message.date})</i>
            </div>
            <Emoji
              emoji={message.content}
              set="emojione"
              size={24}
              style={{ alignSelf: 'center' }}
            />
          </div>
        );
      }
      if (message.type.indexOf('PICTURE') === 0) {
        return (
          <div
            style={{
              border: 0,
              margin: 0,
              padding: 0,
              textAlign:
                this.props.auth.name === message.sender ? 'right' : 'left'
            }}
            key={index}
          >
            <div>
              <b>{message.sender} </b>
              <i>({message.date})</i>
            </div>
            <img
              className="card-img-fluid rounded"
              src="https://www.publicdomainpictures.net/pictures/80000/velka/horse-picture-in-a-field.jpg"
              alt="Card image cap"
              style={{
                width: '10%'
              }}
            />
          </div>
        );
      }
    });
    return arrayOfMessages;
  }

  scrollToBottom() {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  }

  renderMessages() {
    return (
      <div>
        {this.props &&
          this.props.conversation &&
          this.getMessages(this.props.conversation.messages)}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderMessages()}
        <div ref={this.messagesEnd} />
      </div>
    );
  }
}

function mapStateToProps({ auth, conversation }) {
  return { auth, conversation };
}

export default connect(
  mapStateToProps,
  {
    fetchMessage
  }
)(Messages);
