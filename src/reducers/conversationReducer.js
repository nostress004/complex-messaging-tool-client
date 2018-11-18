import { FETCH_CONVERSATION, FETCH_MESSAGE } from '../actions/types';
import update from 'immutability-helper';
import { tmpdir } from 'os';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CONVERSATION:
      return addConversationToState(state, action);
    case FETCH_MESSAGE:
      return addMessageToConversation(state, action);
    default:
      return state;
  }
}

function addConversationToState(state, action) {
  return update(state, {
    recipient: {
      $set: action.payload.recipient
    }
  });
}

function addMessageToConversation(state, action) {
  return update(state, {
    messages: {
      $push: [action.payload.message]
    }
  });
}
