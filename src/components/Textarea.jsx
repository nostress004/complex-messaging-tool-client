import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { messageToServer } from '../socket-io-client/messageToServer';
import { Emoji, Picker } from 'emoji-mart';

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      textArea: true
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onEmojiPicker = this.onEmojiPicker.bind(this);
  }

  onSubmit(event) {
    if (!this.state.inputText || this.state.inputText.length <= 0) {
      return;
    }
    const messageObj = {
      type: 'TEXT',
      sender: this.props.auth.email,
      content: this.state.inputText
    };
    messageToServer(messageObj);
    this.setState({ inputText: '' });
    //this.props.callback();
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ inputText: event.target.value });
  }

  onEmojiPicker() {
    this.setState({ textArea: !this.state.textArea });
  }

  getArea() {
    if (this.state && this.state.textArea === 'undefined') {
      return;
    }

    if (this.state.textArea) {
      return (
        <input
          type="textarea"
          rows="4"
          value={this.state && this.state.inputText}
          onChange={this.handleChange}
          style={{ flexBasis: '75%' }}
        />
      );
    } else if (!this.state.textArea) {
      return (
        <div>
          <Picker perLine={4} style={{ flexBasis: '75%' }} />
        </div>
      );
    }
  }

  renderTextBox3() {
    return (
      <div
        className="card rounded"
        style={{
          background: 'lightblue',
          height: '100%',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <button
          className="btn btn-outline-warning"
          onClick={this.onEmojiPicker}
          style={{
            flexBasis: '5%',
            padding: '0 5px 0 0',
            margin: 0,
            alignSelf: 'center',
            height: '25%',
            background: 'white'
          }}
        >
          <Emoji
            emoji="smile"
            set="emojione"
            size={24}
            style={{ alignSelf: 'center' }}
          />
        </button>
        <form
          className="card-body"
          onSubmit={this.onSubmit}
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: 5
          }}
        >
          {this.getArea()}
          <input
            className="btn btn-success"
            type="submit"
            value="Send"
            style={{ flexBasis: '15%', height: '50%', alignSelf: 'center' }}
          />
        </form>
      </div>
    );
  }

  render() {
    return (
      <div style={{ padding: 0, height: '100%' }}>{this.renderTextBox3()}</div>
    );
  }
}

function mapStateToProps({ auth, conversation }) {
  return { auth, conversation };
}

export default connect(mapStateToProps)(TextArea);
