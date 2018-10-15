import React, { Component } from 'react';

import UserCard from './UserCard';
import UserPicture from './UserPicture';
import Messages from './Messages';
import TextArea from './TextArea';

class MessageLayout extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    return (
      <div className="messages-main vertical-container">
        <div className="function-container">
          <div className="function-box">
            <button className="btn btn-outline-primary btn-block">Nudge</button>
          </div>
          <div className="function-box">
            <button className="btn btn-outline-success btn-block">
              View Userlist
            </button>
          </div>
          <div className="function-box">
            <button className="btn btn-outline-danger btn-block">
              Exit conversation
            </button>
          </div>
        </div>
        <div className="input-container user-height">
          <div className="input-box-1">
            <UserPicture picture={true} size={200} />
          </div>
          <div className="input-box-2">
            <UserCard picture={false} />
          </div>
        </div>
        <div className="input-container messages-height">
          <div className="input-box-1" />
          <div className="input-box-2" style={{ height: '100%' }}>
            <Messages />
          </div>
        </div>
        <div className="input-container user-height">
          <div className="input-box-1">
            <UserPicture picture={true} size={300} />
          </div>
          <div className="input-box-2" style={{ height: '60%' }}>
            <TextArea picture={false} />
          </div>
        </div>
      </div>
    );
  }
}

export default MessageLayout;
