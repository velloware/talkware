import { io } from 'socket.io-client';

const socket = io('ws://localhost:1337/', {});

socket.on('connect', () => {
  console.log(`connect ${socket.id}`);
});

socket.emit('voice', "Ola");

socket.on('voicePush', (data) => {
  console.log(`voicePush ${data}`);
});

socket.on('disconnect', () => {
  console.log(`Disconnect For SocketServer`);
});
