import { FETCH_USER, FETCH_USERS, FETCH_MESSAGES } from './types';

import { emitSignIn } from '../socket-io-client/messageToServer';
//this is async instead of .then

export const fetchStoreData = ({ auth, users, messages }) => async dispatch => {
  emitSignIn({
    email: auth._doc.email,
    status: 'Online',
    name: auth._doc.name
  });
  dispatch({ type: FETCH_USER, payload: auth._doc });
  dispatch({ type: FETCH_USERS, payload: users });
  dispatch({ type: FETCH_MESSAGES, payload: messages });
};

export const fetchUser = auth => async dispatch => {
  dispatch({ type: FETCH_USER, payload: auth });
};

export const fetchUsers = users => async dispatch => {
  let onlineUsers = [],
    offlineUsers = [];

  users.map(user => {
    if (user.status === 'Online') {
      onlineUsers.push(user);
    } else {
      offlineUsers.push(user);
    }
  });
  dispatch({ type: FETCH_USERS, payload: { onlineUsers, offlineUsers } });
};

export const fetchMessages = (err, messages) => async dispatch => {
  if (err) {
    return;
  }
  dispatch({ type: FETCH_MESSAGES, payload: messages });
};
