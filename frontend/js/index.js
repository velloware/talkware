/* eslint-disable no-undef */
import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

let tokenUser = 'Anonymous';
tokenUser = prompt(
  'Enter your tokenUser, IF you dont have one, please enter Anonymous or press Ok to continue',
);

tokenUser = tokenUser || 'Anonymous';

let socket;
if (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
) {
  socket = io('localhost:5337', {
    query: {
      token: tokenUser,
    },
  });
} else {
  socket = io('https://talkware-backend.velloware.com/', {
    query: {
      token: tokenUser,
    },
  });
}

socket.on('connect', () => setUserName(socket.id));
socket.on('disconnect', () => console.log(`Disconnect For SocketServer`));

socket.on('error', data => onError(data));
socket.on('message', data => writeMessagesInteTextArea(data));
socket.on('log', data => console.log(data));

socket.on('voice', data => console.log(data));

const sendMessage = () => {
  const message = document.getElementById('message').value;
  writeMessagesInteTextArea(`Me: ${message}`);
  socket.emit('message', message);
};

const setUser = () => {
  const name = document.getElementById('name').value;
  socket.emit('changeName', name);

  setUserName(`${name} With Session ${socket.id}`);
};

const writeMessagesInteTextArea = data => {
  const roomRef = document.getElementById('room');
  roomRef.value = roomRef.value += data += '\n';
};

const setUserName = name => {
  const userIdRef = document.getElementById('userId');
  userIdRef.textContent = name;
};

const setRoomName = name => {
  const userIdRef = document.getElementById('roomCurrent');
  userIdRef.textContent = name;
};
setRoomName('No Room Selected. GLOBAL CHAT');

const setRoom = () => {
  const roomId = document.getElementById('roomIdJoin').value;
  socket.emit('joinRoom', {
    idRoom: roomId,
    token: 'Anonymous',
  });

  setRoomName(`${roomId}`);
};

const onError = error => {
  console.log(error);
};

document.getElementById('sender').addEventListener('click', sendMessage);
document.getElementById('setName').addEventListener('click', setUser);
document.getElementById('setRoom').addEventListener('click', setRoom);
