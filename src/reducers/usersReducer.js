import {
  FETCH_USERS,
  FETCH_FRIEND_SIGNIN,
  FETCH_FRIEND_SIGNOUT,
  REMOVE_ONLINEUSER,
  REMOVE_OFFLINEUSER
} from '../actions/types';
import update from 'immutability-helper';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload || false;
    case FETCH_FRIEND_SIGNIN:
      return addOnline(state, action);
    case REMOVE_ONLINEUSER:
      return removeOnline(state, action);
    case REMOVE_OFFLINEUSER:
      return removeOffline(state, action);
    case FETCH_FRIEND_SIGNOUT:
      return addOffline(state, action);
    default:
      return state;
  }
}

function addOnline(state, action) {
  return update(state, {
    onlineUsers: {
      $push: [action.payload.user]
    }
  });
}

function addOffline(state, action) {
  return update(state, {
    offlineUsers: {
      $push: [action.payload.user]
    }
  });
}

function removeOnline(state, action) {
  return update(state, {
    onlineUsers: arr => arr.filter(item => item != action.payload.user)
  });
}

function removeOffline(state, action) {
  return update(state, {
    offlineUsers: arr => arr.filter(item => item != action.payload.user)
  });
}

//update(state, {
//items: arr => arr.filter(item => item != 7),
//})
