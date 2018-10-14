import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { messageToServer } from '../socket-io-client/messageToServer';
import { Emoji, Picker } from 'emoji-mart';

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(event) {
    if (!this.state.inputText || this.state.inputText.length <= 0) {
      return;
    }
    messageToServer(this.state.inputText);
    this.setState({ inputText: '' });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ inputText: event.target.value });
  }

  renderTextBox() {
    return (
      <div className="row" style={{ height: '100%' }}>
        <form onSubmit={this.onSubmit}>
          <label>
            Your message:
            <input
              type="textarea"
              value={this.state && this.state.inputText}
              onChange={this.handleChange}
            />
          </label>
          <input className="btn btn-success" type="submit" value="Send" />
        </form>
      </div>
    );
  }

  renderTextBox2() {
    return (
      <div
        className="card rounded"
        style={{ background: 'lightblue', height: '10%' }}
      >
        <form className="card-body row" onSubmit={this.onSubmit}>
          <label className="col-2">Your message:</label>
          <input
            className="col-8"
            type="textarea"
            value={this.state && this.state.inputText}
            onChange={this.handleChange}
          />
          <input className="btn btn-success col-2" type="submit" value="Send" />
        </form>
        <div className="card-text">
          <Emoji emoji="santa" set="emojione" size={16} />
        </div>
      </div>
    );
  }

  render() {
    return <div style={{ padding: 0 }}>{this.renderTextBox2()}</div>;
  }
}

export default TextArea;
