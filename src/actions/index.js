import {
  FETCH_USER,
  FETCH_USERS,
  FETCH_MESSAGE,
  FETCH_FRIEND_SIGNIN,
  FETCH_FRIEND_SIGNOUT,
  FETCH_CONVERSATION,
  REMOVE_ONLINEUSER,
  REMOVE_OFFLINEUSER
} from './types';

import { emitSignIn } from '../socket-io-client/messageToServer';
//this is async instead of .then
export const fetchMessageData = ({ auth, recipient }) => async dispatch => {
  dispatch({ type: FETCH_USER, payload: auth });
  dispatch({ type: FETCH_CONVERSATION, payload: { recipient } });
};

export const fetchConversation = ({ messageHistory }) => {
  dispatch({ type: FETCH_CONVERSATION, payload: messageHistory });
};

export const fetchMessage = ({ message }) => async dispatch => {
  dispatch({ type: FETCH_MESSAGE, payload: message });
};

export const fetchStoreData = ({ auth, users, messages }) => async dispatch => {
  emitSignIn({
    email: auth._doc.email
  });
  dispatch({ type: FETCH_USER, payload: auth._doc });
  dispatch({ type: FETCH_USERS, payload: users });
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

export const fetchFriendSignIn = user => async dispatch => {
  dispatch({
    type: FETCH_FRIEND_SIGNIN,
    payload: { user }
  });
  dispatch({
    type: REMOVE_OFFLINEUSER,
    payload: { user }
  });
};

export const fetchFriendSignOut = user => async dispatch => {
  dispatch({
    type: FETCH_FRIEND_SIGNOUT,
    payload: { user }
  });
  dispatch({
    type: REMOVE_ONLINEUSER,
    payload: { user }
  });
};
