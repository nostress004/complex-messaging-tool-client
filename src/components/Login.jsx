import React, { Component } from 'react';

import {
  emitStatusUpdate,
  onStatusUpdate
} from '../socket-io-client/messageToServer';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Csaba Kigyósi', status: 'Available' }
    };

    onStatusUpdate((err, status) => {
      console.log('called onStatusUpdate');
      let user = { name: this.state.currentUser.name, status };
      this.setState({ currentUser: user });
    });

    this.onStatusUpdateClick = this.onStatusUpdateClick.bind(this);
  }

  onStatusUpdateClick(event) {
    let status =
      this.state.currentUser.status === 'Available' ? 'Busy' : 'Available';
    emitStatusUpdate(status);

    event.preventDefault();
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
              <h4>{this.state.currentUser.name}</h4>
              <p
                className="card-text col-8"
                style={{
                  padding: 0
                }}
              >
                <i>{this.state.currentUser.status || 'N/A'}</i>
              </p>
              <button
                onClick={this.onStatusUpdateClick}
                className="btn btn-sm btn-success"
              >
                Update status
              </button>
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

export default Login;
