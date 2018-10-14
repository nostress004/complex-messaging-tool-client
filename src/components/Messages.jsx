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

    messageToClient((err, message = 'no message yet') => {
      console.log('called messageToServer');
      this.setState({
        messages: [...this.state.messages, message]
      });
    });
  }

  getMessages(messages) {
    if (!messages && messages.length < 1) {
      return <div>There are no messages atm </div>;
    }

    const arrayOfMessages = messages.map((message, index) => (
      // Only do this if items have no stable IDs
      <li key={index}>
        <b>{new Date(message.time * 100).toLocaleTimeString('en-GB')}</b>:{' '}
        {message.text}
      </li>
    ));
    return arrayOfMessages;
  }

  renderMessages() {
    return (
      <div className="row" style={{ height: '100%' }}>
        <div className="col-9">
          {this.state && this.getMessages(this.state.messages)}

          <Emoji emoji="joy" set="emojione" size={32} />
          <Emoji emoji="joy" set="emojione" size={32} />
          <Emoji emoji="joy" set="emojione" size={32} />
          <Emoji emoji="joy" set="emojione" size={32} />
        </div>
      </div>
    );
  }

  render() {
    return <div style={{ padding: 0 }}>{this.renderMessages()}</div>;
  }
}

export default Messages;
