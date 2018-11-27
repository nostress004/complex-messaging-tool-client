import { callbackify } from 'util';
import socket from './connect';

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

function emitAddFriend(from, email) {
  socket.emit('addFriend', { from, email });
}

// conversation related functions

function emitConversationInit(myGoogleID, recipient) {
  if (myGoogleID && recipient) {
    socket.emit('initConversation', myGoogleID, recipient);
  }
}

function onConverstationInitalized(callBack) {
  socket.on('conversationInitialized', (conversation, recipient) => {
    callBack(conversation, recipient);
  });
}

function onNewConversationRequest(callBack) {
  socket.on('newConversationRequest', (fromClient, conversation) => {
    callBack(fromClient, conversation);
  });
}

function emitMessageClientID(store) {
  if (store) {
    socket.emit('messageClientID', store.auth);
  }
}

// messaging related functions

function messageToServer(fromUser, toUser, message) {
  socket.emit('message', { from: fromUser, to: toUser, message });
  console.log(`${message.content} message has been sent to the server`);
}

function messageToClient(callBack) {
  socket.on('messageHandled', message => {
    callBack(message);
  });
}

function nudgeToServer(fromUser, toUser) {
  socket.emit('nudgeToServer', { from: fromUser, to: toUser });
}

function nudgeToClient(callBack) {
  socket.on('nudgeToClient', () => {
    callBack();
  });
}

// error handling

function onUserListError(callBack) {
  socket.on('errorMessage', errorMessage => {
    callBack((errorMessage && errorMessage.message) || 'error');
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
  emitMessageClientID,
  nudgeToServer,
  nudgeToClient
};
