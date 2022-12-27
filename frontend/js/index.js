/* eslint-disable no-undef */
import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

let tokenUser = 'Anonymous';
let socket;

const messageElement = document.querySelector('#message');
const roomElement = document.querySelector('#room');
const roomsPublic = document.querySelector('#roomsPublic');
const roomId = document.querySelector('#roomIdJoin');
const name = document.getElementById('name');

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
  const message = messageElement.value;

  if (message.trim() === '') return;

  writeMessagesInteTextArea(`Me: ${message}`);

  socket.emit('message', message);
  messageElement.value = '';
};

const setUser = () => {
  if (name.value.trim() === '') return;

  socket.emit('changeName', name.value);

  setUserName(`${name.value} With Session ${socket.id}`);
};

const writeMessagesInteTextArea = data => {
  roomElement.value = roomElement.value += data += '\n';
};

const setUserName = name => {
  const userIdRef = document.getElementById('userId');
  userIdRef.textContent = name;
};

const setRoomName = name => {
  const userIdRef = document.getElementById('roomCurrent');
  userIdRef.textContent = name;
};

const setRoom = idRoom => {
  if (idRoom && typeof idRoom == 'string') {
    socket.emit('joinRoom', {
      idRoom: idRoom,
      token: 'Anonymous',
    });

    setRoomName(`${idRoom}`);
  } else {
    if (roomId.value.trim() === '') return;

    socket.emit('joinRoom', {
      idRoom: roomId.value,
      token: 'Anonymous',
    });

    setRoomName(`${roomId.value}`);
  }
};

const chooseRoom = () => {
  setRoom(roomsPublic.value);
};

const onError = error => {
  console.log(error);
};

const cleanElements = () => {
  messageElement.value = '';
  roomElement.value = '';
  roomsPublic.options[0].selected = true;
  roomId.value = '';
  name.value = '';
};

document.getElementById('sender').addEventListener('click', sendMessage);
document.getElementById('setName').addEventListener('click', setUser);
document.getElementById('setRoom').addEventListener('click', setRoom);
document.getElementById('roomsPublic').addEventListener('change', chooseRoom);

document.onkeyup = e => {
  if (e.key === 'Enter') {
    sendMessage();
  }

  if (e.key === 'Escape') {
    cleanElements();
    setRoomName('Hidden');
    setUserName('Hidden');
  }
};

setRoomName('No Room Selected. GLOBAL CHAT');
