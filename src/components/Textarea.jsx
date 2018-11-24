import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { messageToServer } from '../socket-io-client/messageToServer';
import { Emoji } from 'emoji-mart';
import EmojiPicker from 'emoji-picker-react';

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      textArea: true,
      emojiCode: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onEmojiPicker = this.onEmojiPicker.bind(this);
    this.onEmojiPicked = this.onEmojiPicked.bind(this);
  }

  onSubmit(event) {
    if (
      !this.state.inputText ||
      this.state.inputText.length <= 0 ||
      !this.props.auth ||
      !this.props.conversation.recipient
    ) {
      return;
    }
    const messageObj = {
      type: 'TEXT',
      sender: this.props.auth.name,
      content: this.state.inputText
    };

    messageToServer(
      this.props.auth,
      this.props.conversation.recipient,
      messageObj
    );
    this.setState({ inputText: '' });

    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ inputText: event.target.value });
  }

  onEmojiPicker() {
    this.setState({ textArea: !this.state.textArea });
  }

  onEmojiPicked(code, emojiObj) {
    this.setState({ textArea: !this.state.textArea });
    if (!this.props.auth || !this.props.conversation.recipient) {
      return;
    }
    const messageObj = {
      type: 'EMOJI',
      sender: this.props.auth.name,
      content: emojiObj.name
    };

    messageToServer(
      this.props.auth,
      this.props.conversation.recipient,
      messageObj
    );
    this.setState({ inputText: '' });

    event.preventDefault();
  }

  getArea() {
    if (this.state && this.state.textArea === 'undefined') {
      return;
    }

    if (this.state.textArea) {
      return (
        <input
          type="textarea"
          multiple={true}
          value={this.state && this.state.inputText}
          onChange={this.handleChange}
          style={{ flexBasis: '75%' }}
        />
      );
    } else if (!this.state.textArea) {
      return (
        <div>
          <EmojiPicker
            onEmojiClick={(e, v) => {
              this.onEmojiPicked(e, v);
            }}
          />
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
            flexBasis: '2%',
            padding: '5px 5px 0 5px',
            margin: '0 0 0 5px',
            alignSelf: 'center',
            height: '50%',
            background: 'white'
          }}
        >
          <Emoji
            emoji="slightly_smiling_face"
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
            style={{ flexBasis: '15%', alignSelf: 'center' }}
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
