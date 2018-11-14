import React, { Component } from 'react';

import { connect } from 'react-redux';

class UserPicture extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      picture: props.picture,
      size: props.size
    };
  }

  render() {
    return (
      <div>
        <img
          className="card-img-fluid profile_picture rounded"
          src={this.props.auth && this.props.auth.photo}
          hidden={!this.state.picture}
          alt="Card image cap"
          style={{
            borderStyle: 'solid',
            background: 'white',
            width: '70%'
          }}
        />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(UserPicture);
