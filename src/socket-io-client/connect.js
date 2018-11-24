import io from 'socket.io-client';

//const socket = io('http://localhost:5000', { forceNew: false });
const socket = io('https://safe-crag-14775.herokuapp.com', { forceNew: false });

export default socket;
