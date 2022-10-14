import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

const socket = io('ws://talkware.velloware.com/', {
  path: 'server'
});

socket.on('connect', () => setUserName(socket.id));
socket.on('disconnect', () => console.log(`Disconnect For SocketServer`));

socket.on('messageSender', data => writeMessagesInteTextArea(data));

const sendMessage = () => {
  const message = document.getElementById('message').value;
  writeMessagesInteTextArea(`You: ${message}`);
  socket.emit('message', message);
};

const setUser = () => {
  const name = document.getElementById('name').value;
  socket.emit('userData', name);

  setUserName(`${name} With Session ${socket.id}`);
};

const writeMessagesInteTextArea = data => {
  const chatRef = document.getElementById('chat');
  chatRef.value = chatRef.value += data += '\n';
};

const setUserName = name => {
  const userIdRef = document.getElementById('userId');
  userIdRef.textContent = name;
};

document.getElementById('sender').addEventListener('click', sendMessage);
document.getElementById('setName').addEventListener('click', setUser);
