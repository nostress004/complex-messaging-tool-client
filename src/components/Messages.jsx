import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { messageToClient } from '../socket-io-client/messageToServer';
import { Emoji } from 'emoji-mart';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.messagesEnd = React.createRef();
    messageToClient((err, message = 'no message yet') => {
      console.log('called messageToServer');
      this.setState({
        messages: [...this.state.messages, message]
      });
    });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  getMessages(messages) {
    if (!messages && messages.length < 1) {
      return <div>There are no messages atm </div>;
    }

    const arrayOfMessages = messages.map((message, index) => (
      // Only do this if items have no stable IDs
      <p style={{ border: 0, margin: 0, padding: 0 }} key={index}>
        <b>{message.time}</b>: {message.text}
      </p>
    ));
    return arrayOfMessages;
  }

  scrollToBottom() {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  }

  renderMessages() {
    return <div>{this.state && this.getMessages(this.state.messages)}</div>;
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

export default Messages;
