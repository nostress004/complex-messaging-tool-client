import { FETCH_USER, FETCH_USERS, FETCH_MESSAGES } from './types';

import { ipcRenderer } from 'electron';

//this is async instead of .then

export const fetchStoreData = ({ auth, users, messages }) => async dispatch => {
  // debugger;
  dispatch({ type: FETCH_USER, payload: auth });
  dispatch({ type: FETCH_USERS, payload: users });
  dispatch({ type: FETCH_MESSAGES, payload: messages });
};

export const fetchUser = auth => async dispatch => {
  debugger;

  ipcRenderer.send('showUsers', { auth });
  dispatch({ type: FETCH_USER, payload: auth });
};

export const fetchUsers = users => async dispatch => {
  dispatch({ type: FETCH_USERS, payload: users });
};

export const fetchMessages = (err, messages) => async dispatch => {
  if (err) {
    return;
  }
  dispatch({ type: FETCH_MESSAGES, payload: messages });
};
