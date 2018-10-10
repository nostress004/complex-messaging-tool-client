import React, { Component } from 'react';

import UserCard from './UserCard';
import UserPicture from './UserPicture';
import Messages from './Messages';

class MessageLayout extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    return (
      <div
        className="container-fluid"
        style={{ height: '100%', padding: 0, margin: 5 }}
      >
        <div className="row" style={{ margin: 10 }}>
          <div className="col-4">
            <button className="btn btn-outline-primary btn-block">Nudge</button>
          </div>
          <div className="col-4">
            <button className="btn btn-outline-success btn-block">
              View Userlist
            </button>
          </div>
          <div className="col-4">
            <button className="btn btn-outline-danger btn-block">
              Exit conversation
            </button>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-3">
            <UserPicture picture={true} size={300} />
          </div>
          <div className="col-9">
            <UserCard picture={false} />
          </div>
        </div>
        <div className="row" style={{ height: '80%' }}>
          <div className="offset-lg-3 col-9">
            <Messages />
          </div>
        </div>

        <div
          className="row align-items-center fixed-bottom"
          style={{ marginBottom: 5 }}
        >
          <div className="col-3">
            <UserPicture picture={true} size={300} />
          </div>
          <div className="col-9">
            <UserCard picture={false} />
          </div>
        </div>
      </div>
    );
  }
}

export default MessageLayout;
