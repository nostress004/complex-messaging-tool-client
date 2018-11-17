import { combineReducers } from 'redux';

import authReducer from './authReducer';
import usersReducer from './usersReducer';
import conversationReducer from './conversationReducer';

export default combineReducers({
  auth: authReducer,
  userList: usersReducer,
  conversation: conversationReducer
});
