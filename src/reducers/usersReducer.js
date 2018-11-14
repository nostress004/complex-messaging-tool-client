import {
  FETCH_USERS,
  FETCH_FRIEND_SIGNIN,
  FETCH_FRIEND_SIGNOUT
} from '../actions/types';
import update from 'immutability-helper';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload || false;
    case FETCH_FRIEND_SIGNIN:
      return updateOnlineState(state, action);
    case FETCH_FRIEND_SIGNOUT:
      return updateOfflineState(state, action);
    default:
      return state;
  }
}

function updateOnlineState(state, action) {
  return update(state, {
    onlineUsers: {
      $push: [action.payload.user]
    }
  });
}

function updateOfflineState(state, action) {
  return update(state, {
    offlineUsers: {
      $push: [action.payload.user]
    }
  });
}
