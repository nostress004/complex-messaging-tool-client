import { combineReducers } from 'redux';

import authReducer from './authReducer';
import usersReducer from './usersReducer';
import messagesReducer from './messagesReducer';
import conversationReducer from './conversationReducer';

export default combineReducers({
  auth: authReducer,
  userList: usersReducer,
  messageWindow: messagesReducer,
  conversation: conversationReducer
});
