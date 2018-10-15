import React, { Component } from 'react';

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
          src="https://c.tribune.com.pk/2017/03/1356933-msn-1489661345-517-640x480.jpg"
          hidden={!this.state.picture}
          alt="Card image cap"
          style={{
            borderStyle: 'solid',
            background: 'white',
            width: '85%'
          }}
        />
      </div>
    );
  }
}

export default UserPicture;
