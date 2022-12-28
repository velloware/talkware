/* eslint-disable no-undef */

const hasToken = window.localStorage.getItem('@token') === null ? false : true;

if (!hasToken) {
  if (window.location.href.includes('index.html')) {
    window.location.href = window.location.href.replace(
      'index.html',
      '/pages/login.html',
    );
  } else {
    window.location.href = window.location.href + '/pages/login.html';
  }
}

import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
import { getUserRooms } from './rooms.js';

let tokenUser = 'Anonymous';

try {
  const token = localStorage.getItem('@token');

  if (token) {
    tokenUser = token;
  }
} catch (error) {
  console.log(error);
}

let socket;

const messageElement = document.querySelector('#message');
const roomElement = document.querySelector('#room');
const roomsPublic = document.querySelector('#roomsPublic');
const roomId = document.querySelector('#roomIdJoin');
const name = document.getElementById('name');
const login_a = document.querySelector('#login__a');
const sign_a = document.querySelector('#sign__a');

login_a.style.display = 'none';
sign_a.style.display = 'none';

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

const clearSession = () => {
  socket.disconnect();
  cleanElements();
  localStorage.clear();
  window.location.reload();
};

const addRoomsInSelect = () => {
  const rooms = getUserRooms();
  if (rooms) {
    rooms.forEach(room => {
      let opt = document.createElement('option');
      opt.value = room.id;
      opt.innerHTML = room.name;
      roomsPublic.appendChild(opt);
    });
  }
};

document.getElementById('sender').addEventListener('click', sendMessage);
document.getElementById('setName').addEventListener('click', setUser);
document.getElementById('setRoom').addEventListener('click', setRoom);
document.getElementById('exit').addEventListener('click', clearSession);
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
addRoomsInSelect();
