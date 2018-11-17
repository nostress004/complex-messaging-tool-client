import openSocket from 'socket.io-client';

//const socket = openSocket('http://localhost:5000');
const socket = openSocket('https://safe-crag-14775.herokuapp.com');

export default socket;
