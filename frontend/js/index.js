/* eslint-disable no-undef */
import { config } from './config.js';

/* Redirect to login page if user is not logged in
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
}*/

// if url have ?room= then join room
const urlParams = new URLSearchParams(window.location.search);
const roomAutoJoin = urlParams.get('room');

import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
import { getUserRooms } from './rooms.js';

let tokenUser = localStorage.getItem('@token')
  ? localStorage.getItem('@token')
  : 'Anonymous';

let socket;

if (tokenUser === 'Anonymous') {
  // get userName element
  const userName = document.querySelector('#UserName');
  userName.innerHTML = 'Your are Anonymous';
  userName.style.color = 'red';

  const loginPage = document.querySelector('#loginPage');
  loginPage.innerHTML = 'Login here';
  loginPage.href = '/pages/login.html';
} else {
  // get userName element
  const userName = document.querySelector('#UserName');
  userName.innerHTML = 'Your are logged';
  loginPage.style.display = 'none';
  userName.style.color = 'green';
}

const messageElement = document.querySelector('#message');
const roomElement = document.querySelector('#room');
const roomsPublic = document.querySelector('#roomsPublic');
const roomId = document.querySelector('#roomIdJoin');
const name = document.getElementById('name');
const login_a = document.querySelector('#login__a');
const sign_a = document.querySelector('#sign__a');

login_a.style.display = 'none';
sign_a.style.display = 'none';

socket = io(config.URLBACKEND, {
  query: {
    token: tokenUser,
  },
});

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
  if (roomsPublic.value === '0') {
    socket.emit('leaveRoom');
    writeMessagesInteTextArea('You left the room');
    setRoomName('No Room');
    return;
  }
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

const addRoomsInSelect = async () => {
  const rooms = await getUserRooms();
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

if (roomAutoJoin) {
  setRoom(roomAutoJoin);
}

const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersColorScheme.matches) {
  document.getElementsByTagName('html')[0].classList.add('dark-mode');
}
