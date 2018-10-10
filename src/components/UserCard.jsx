import React, { Component } from 'react';
import UserPicture from './UserPicture';

class UserCard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { picture: props.picture };
  }

  render() {
    return (
      <div className="card-column rounded">
        <div className="card" style={{ background: 'lightblue' }}>
          <div className="card-body row">
            <UserPicture hidden={!this.state.picture} />
            <div className="card-title col-8">
              <h4>John Doe (Available)</h4>
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
}

export default UserCard;
