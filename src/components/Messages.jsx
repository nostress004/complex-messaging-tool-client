import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  messageToClient,
  messageToServer
} from '../socket-io-client/messageToServer';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      messages: []
    };

    messageToClient((err, message = 'no message yet') => {
      console.log('called messageToServer');
      this.setState({
        messages: [...this.state.messages, message]
      });
    });

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(event) {
    if (!this.state.inputText) {
      return;
    }
    messageToServer(this.state.inputText);
    this.setState({ inputText: '' });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ inputText: event.target.value });
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

  renderPizzas() {
    return (
      <div className="row">
        <div className="col-3">
          <h2>CMT</h2>
        </div>
        <div className="col-9">
          {this.state && this.getMessages(this.state.messages)}
          <div className="row fixed-bottom">
            <div className="col-3" />
            <div className="col-9">
              <form onSubmit={this.onSubmit}>
                <label>
                  Your message:
                  <input
                    type="text"
                    value={this.state && this.state.inputText}
                    onChange={this.handleChange}
                  />
                </label>
                <input className="btn btn-success" type="submit" value="Send" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.renderPizzas()}</div>;
  }
}

function mapStateToProps({ pizzas }) {
  return { pizzas };
}

export default Messages;
