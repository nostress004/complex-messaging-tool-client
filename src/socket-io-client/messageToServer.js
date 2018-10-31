import { callbackify } from 'util';
import socket from './connect';
// TODO:move variables to config files

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

function emitSignIn() {
  debugger;
  socket.emit('signIn');
  console.log('Signin has started!');
}

function onSignIn(callBack) {
  debugger;
  socket.on('signedIn', auth => {
    // TODO: investigate why it wraps itself to an object
    callBack(auth);
  });
  console.log('Successful signin!');
}

export {
  messageToServer,
  messageToClient,
  emitStatusUpdate,
  onStatusUpdate,
  emitSignIn,
  onSignIn
};
