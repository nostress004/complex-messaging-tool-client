import openSocket from 'socket.io-client';

// TODO:move variables to config files

const socket = openSocket('https://safe-crag-14775.herokuapp.com');
//const socket = openSocket('http://localhost:5000');

function messageToClient(cb) {
  socket.on('messageToClient', message => cb(null, message));
  console.log('this is the messageToClient function');
}

function messageToServer(message) {
  socket.emit('messageToServer', message);
  console.log('this is the messageToServer function');
}

export { messageToServer, messageToClient };
