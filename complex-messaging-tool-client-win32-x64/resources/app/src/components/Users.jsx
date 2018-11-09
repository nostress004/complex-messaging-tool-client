import React, { Component } from 'react';

import { emitStatusUpdate } from '../socket-io-client/messageToServer';
import { connect } from 'react-redux';
import UserList from './UserList';

class Users extends Component {
  constructor(props) {
    super(props);

    this.onStatusUpdateClick = this.onStatusUpdateClick.bind(this);

    if (this.props.auth) {
    }
  }

  onStatusUpdateClick(event) {
    emitStatusUpdate(this.props.auth._id);
    event.preventDefault();
  }

  renderUsers() {
    console.log(this.props);
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
              <div type="text" disabled onClick={this.onStatusUpdateClick}>
                <button
                  onClick={this.onStatusUpdateClick}
                  className="btn btn-sm btn-success"
                  style={{
                    marginRight: 5
                  }}
                >
                  Add friend
                </button>
              </div>
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
