import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { messageToClient } from '../socket-io-client/messageToServer';
import { Emoji } from 'emoji-mart';
import { fetchMessages } from '../actions';

class Messages extends Component {
  constructor(props, context) {
    super(props, context);
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
    //messageToClient(this.props.fetchMessages);
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

function mapStateToProps({ messageList, auth }) {
  return { messageList, auth };
}

export default connect(
  mapStateToProps,
  {
    fetchMessages
  }
)(Messages);
