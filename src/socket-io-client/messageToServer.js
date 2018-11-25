import { callbackify } from 'util';
import socket from './connect';

function messageToServer(fromUser, toUser, message) {
  socket.emit('message', { from: fromUser, to: toUser, message });
  console.log(`${message} message has been sent to the server`);
}

function messageToClient(callBack) {
  socket.on('messageHandled', message => {
    callBack(message);
  });
  console.log('this is the messageToClient function');
}

function emitStatusUpdate(status) {
  socket.emit('updateStatus', status);
  console.log(`${status} has been sent to the server`);
}

function onStatusUpdate(callBack) {
  socket.on('statusUpdated', status => {
    // TODO: investigate why it wraps itself to an object
    callBack(null, status.status);
  });
}

// authentication

function emitSignIn(user) {
  socket.emit('signIn', user);
}

function onClients(callBack) {
  socket.on('sendClients', clients => {
    callBack(clients);
  });
}

function onFriendSignIn(callBack) {
  socket.on('friendSignIn', client => {
    callBack(client);
  });
}

function onFriendSignOut(callBack) {
  socket.on('friendSignOut', client => {
    callBack(client);
  });
}

// update status

function emitAddFriend(from, email) {
  socket.emit('addFriend', { from, email });
}

function emitConversationInit(myGoogleID, recipient) {
  if (myGoogleID && recipient) {
    socket.emit('initConversation', myGoogleID, recipient);
  }
}

function emitMessageClientID(store) {
  if (store) {
    socket.emit('messageClientID', store.auth);
  }
}

function onConverstationInitalized(callBack) {
  socket.on('conversationInitialized', (conversation, recipient) => {
    callBack(conversation, recipient);
  });
}

function onUserListError(callBack) {
  socket.on('errorMessage', errorMessage => {
    callBack((errorMessage && errorMessage.message) || 'error');
  });
}

function onNewConversationRequest(callBack) {
  socket.on('newConversationRequest', (fromClient, conversation) => {
    callBack(fromClient, conversation);
  });
}

export {
  messageToServer,
  messageToClient,
  emitStatusUpdate,
  onStatusUpdate,
  emitSignIn,
  onClients,
  emitAddFriend,
  onFriendSignIn,
  onFriendSignOut,
  emitConversationInit,
  onConverstationInitalized,
  onUserListError,
  onNewConversationRequest,
  emitMessageClientID
};
