import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
const socket = io('https://talkware-backend.velloware.com/', {});
// const socket = io('localhost:5337', {});

socket.on('connect', () => setUserName(socket.id));
socket.on('disconnect', () => console.log(`Disconnect For SocketServer`));

socket.on('error', data => onError(data));
socket.on('messageSender', data => writeMessagesInteTextArea(data));
socket.on('message', data => writeMessagesInteTextArea(data));
socket.on('ChatMessage', data => writeMessagesInteTextArea(data));

socket.on('voice', data => console.log(data));

const sendMessage = () => {
  const message = document.getElementById('message').value;
  writeMessagesInteTextArea(`You: ${message}`);
  socket.emit('message', message);
};

const setUser = () => {
  const name = document.getElementById('name').value;
  socket.emit('changeName', name);

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

const setChatName = name => {
  const userIdRef = document.getElementById('chatCurrent');
  userIdRef.textContent = name;
};
setChatName('No Chat Selected. GLOBAL CHAT');

const setRoom = () => {
  const roomId = document.getElementById('chatIdJoin').value;
  socket.emit('joinChat', {
    idRoom: roomId,
    token: 'Anonymous',
  });

  setChatName(`${roomId}`);
};

const onError = error => {
  console.log(error);
};

document.getElementById('sender').addEventListener('click', sendMessage);
document.getElementById('setName').addEventListener('click', setUser);
document.getElementById('setChat').addEventListener('click', setRoom);
