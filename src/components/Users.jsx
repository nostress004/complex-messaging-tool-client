import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  messageToClient,
  messageToServer
} from '../socket-io-client/messageToServer';

import UserList from './UserList';

class Users extends Component {
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

  renderUsers() {
    return (
      <div className="card-column rounded">
        <div className="card" style={{ background: 'lightblue' }}>
          <div className="card-body row">
            <img
              className="card-img-left col-4 profile_picture rounded"
              src="https://c.tribune.com.pk/2017/03/1356933-msn-1489661345-517-640x480.jpg"
              height="90"
              width="100"
              alt="Card image cap"
              style={{
                borderStyle: 'solid',
                background: 'white'
              }}
            />
            <div className="card-title col-8">
              <h4>John Doe</h4>
              <p
                className="card-text col-8"
                style={{
                  padding: 0
                }}
              >
                <i>Feeling good!</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderUsers()}
        <UserList />
      </div>
    );
  }
}

export default Users;
