import {
  FETCH_CONVERSATION,
  FETCH_MESSAGE,
  FETCH_RECIPIENT
} from '../actions/types';
import update from 'immutability-helper';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_RECIPIENT:
      return addRecipientToState(state, action);
    case FETCH_CONVERSATION:
      return addConversationToState(state, action);
    case FETCH_MESSAGE:
      return addMessageToConversation(state, action);
    default:
      return state;
  }
}

function addRecipientToState(state, action) {
  debugger;
  return update(state, {
    recipient: {
      $set: action.payload.recipient
    }
  });
}

function addConversationToState(state, action) {
  return update(state, {
    messages: {
      $set: action.payload.conversation.messages
    }
  });
}

function addMessageToConversation(state, action) {
  debugger;
  return update(state, {
    messages: {
      $push: [action.payload.message]
    }
  });
}
