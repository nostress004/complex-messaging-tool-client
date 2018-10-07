import openSocket from 'socket.io-client';

// TODO:move variables to config files

const socket = openSocket('https://safe-crag-14775.herokuapp.com');
//const socket = openSocket('https://safe-crag-14775.herokuapp.com');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
  console.log('this is the subscribetimer function');
}

export { subscribeToTimer };
