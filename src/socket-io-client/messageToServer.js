import { callbackify } from 'util';
import socket from './connect';

function messageToServer(message) {
  socket.emit('messageToServer', message);
  console.log(`${message} message has been sent to the server`);
}

function messageToClient(callBack) {
  socket.on('messageToClient', message => callBack(null, message));
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
  console.log('status recieved');
}

// authentication

function emitSignIn(user) {
  socket.emit('signIn', user);
}

function onClients(callBack) {
  socket.on('sendClients', clients => {
    callBack(clients);
  });
  console.log('clients recieved');
}

// update status

function emitAddFriend(email) {
  socket.emit('addFriend', email);
}

export {
  messageToServer,
  messageToClient,
  emitStatusUpdate,
  onStatusUpdate,
  emitSignIn,
  onClients,
  emitAddFriend
};
