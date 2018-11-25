import React, { Component } from 'react';

import { emitAddFriend } from '../socket-io-client/messageToServer';
import { connect } from 'react-redux';
import UserList from './UserList';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addFriend: false
    };

    this.onStatusUpdateClick = this.onStatusUpdateClick.bind(this);
    this.onStatusUpdateSubmit = this.onStatusUpdateSubmit.bind(this);
    this.renderAddFriendComponent = this.renderAddFriendComponent.bind(this);
  }

  onStatusUpdateClick(event) {
    this.setState({ addFriend: true });
    event.preventDefault();
  }

  onStatusUpdateSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ addFriend: false });

    emitAddFriend(this.props.auth, this.input.value);
  }

  renderAddFriendComponent() {
    let renderedComponent;

    if (this.state.addFriend) {
      return (
        <form onSubmit={this.onStatusUpdateSubmit}>
          <input
            ref={element => {
              this.input = element;
            }}
            placeholder="enter e-mail address"
            style={{
              marginRight: 5
            }}
            type="text"
          />
        </form>
      );
    } else {
      return (
        <button
          onClick={this.onStatusUpdateClick}
          className="btn btn-sm btn-success"
          style={{
            marginRight: 5
          }}
        >
          Add friend
        </button>
      );
    }
  }

  renderUsers() {
    return (
      <div className="card-column rounded ">
        <div className="card" style={{ background: 'lightblue' }}>
          <div className="card-body row">
            <img
              className="card-img-left col-4 profile_picture rounded"
              src={this.props.auth.photo}
              alt="Google picture"
              style={{
                borderStyle: 'solid',
                background: 'white',
                width: '100%',
                padding: 0
              }}
            />
            <div className="card-title col-8" style={{ paddingRight: 0 }}>
              <h4>
                <button
                  onClick={this.onStatusUpdateClick}
                  className="btn btn-sm btn-success"
                  style={{
                    paddingRight: 0,
                    marginRight: 5
                  }}
                  disabled={true}
                />
                {this.props.auth.name}
              </h4>
              <p
                className="card-text col-8"
                style={{
                  padding: 0
                }}
              >
                <i> {this.props.auth.email}</i>
              </p>
              <div>{this.renderAddFriendComponent()}</div>
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

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Users);
