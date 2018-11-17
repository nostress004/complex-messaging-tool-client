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
    messageToClient(this.props.fetchMessage);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  getMessages(messages) {
    // @todo: check

    if (!messages || messages.length < 1 || messages[0] === undefined) {
      return <div>There are no messages ATM </div>;
    }

    const arrayOfMessages = messages.map((message, index) => (
      // Only do this if items have no stable IDs
      <p style={{ border: 0, margin: 0, padding: 0 }} key={index}>
        <b>{message.date}</b>: {message.content}
      </p>
    ));
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

function mapStateToProps({ conversation }) {
  return { conversation };
}

export default connect(
  mapStateToProps,
  {
    fetchMessage
  }
)(Messages);
