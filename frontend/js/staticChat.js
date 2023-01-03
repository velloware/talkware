/* eslint-disable no-undef */
// chat to use in sites
import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

export class StaticChat {
  #idRoom = null;

  constructor(roomId) {
    this.#idRoom = roomId;
  }

  get idRoom() {
    return this.#idRoom;
  }

  set idRoom(idRoom) {
    this.#idRoom = idRoom;
  }

  initSocket() {
    const socket = io('https://talkware-backend.velloware.com', {
      query: {
        token: 'Anonymous',
      },
    });

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  build() {
    this.initSocket();
  }
}

export default StaticChat;
