/* eslint-disable no-undef */
// chat to use in sites
import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

export class StaticChat {
  #idRoom = null;
  #socket = null;
  #chatArea = document.querySelector('#room');
  #message = document.querySelector('#message');
  #sender = document.querySelector('#sender');
  #closeChat = document.querySelector('#closeChat');
  #openChat = document.querySelector('#openChat');
  #darkMode = document.querySelector('#darkMode');

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

    socket.emit('joinRoom', {
      idRoom: '1',
      token: 'Anonymous',
    });

    this.#socket = socket;
  }

  createElements() {
    const div = document.createElement('div');
    div.classList.add('chat');
    div.innerHTML = `
    <div class="chatContainer">
    <button id="closeChat" type="button" class="button">X</button>
    <section class="section__chat">
      <h1>Chat: Global Room 1</h1>
      <h1>Session: Anonymous</h1>
      <textarea id="room" cols="30" rows="10" readonly></textarea>  
      <div>
        <input type="text" id="message"/>
        <button id="sender" type="button" class="button">Send</button>
      </div>
    </section>
  <div>`;
    document.body.appendChild(div);

    const divOpenChat = document.createElement('div');
    divOpenChat.classList.add('openChat');
    divOpenChat.innerHTML = `
    <div class="openChatContainer">
      <button id="openChat" type="button" class="button">Open Chat</button>
    </div>`;
    document.body.appendChild(divOpenChat);
  }

  injectStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
    :root {
      --bg: #ddd;
      --color-text: #333;
      --color-h2: #96a08a;
      --color-button: #eee;
      --bg-button: #8a8a8a;
      --bg-button-hover: #96a08a;
      --bg-input: #fff;
    }
    
    .dark-mode:root {
      --bg: #232627;
      --color-text: #cbc6bf;
      --color-h2: #96a08a;
      --color-button: #eee;
      --bg-button: #8a8a8a;
      --bg-button-hover: #96a08a;
      --bg-input: #2b2a33;
    }

    .openChatContainer {
      position: fixed;
      top: 90%;
      right: 20px;
      font-size: 12px;
      color: red;
      padding: 10px;     
    }

    .chatContainer {
      position: fixed;
      top: 45%;
      right: 20px;
      font-size: 12px;
      color: red;
      background-color: var(--bg);
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
      padding: 10px;
    }`;

    document.head.appendChild(style);
  }

  writeMessagesInteTextArea(data) {
    this.#chatArea = document.querySelector('#room');

    this.#chatArea.value = this.#chatArea.value += data += '\n';
  }

  sendMessage(message) {
    this.#socket.emit('message', message);
  }

  initSocketListeners() {
    this.#socket.on('message', message => {
      console.log(message);
      this.writeMessagesInteTextArea(message);
    });

    this.#socket.on('roomData', data => {
      console.log(data);
    });
  }

  initListeners() {
    const openChat = document.querySelector('#openChat');
    openChat.addEventListener('click', () => {
      const chat = document.querySelector('.chatContainer');

      if (chat.style.display === 'block') {
        chat.style.display = 'none';
        return;
      } else {
        chat.style.display = 'block';
        openChat.style.display = 'none';
      }
    });

    const closeChat = document.querySelector('#closeChat');
    closeChat.addEventListener('click', () => {
      const chat = document.querySelector('.chatContainer');

      if (chat.style.display === 'block') {
        chat.style.display = 'none';
        openChat.style.display = 'block';
      } else {
        chat.style.display = 'block';
        openChat.style.display = 'none';
      }
    });

    const sender = document.querySelector('#sender');
    sender.addEventListener('click', () => {
      const message = document.querySelector('#message').value;
      const room = document.querySelector('#room');
      room.innerHTML = message;
      this.writeMessagesInteTextArea(`Me: ${message}`);
      this.sendMessage(message);
    });
  }

  hiddenChat() {
    const chat = document.querySelector('.chatContainer');
    chat.style.display = 'none';
  }

  build() {
    this.initSocket();
    this.createElements();
    this.injectStyles();
    this.hiddenChat();
    this.initSocketListeners();
    this.initListeners();
  }
}

export default StaticChat;
