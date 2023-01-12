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
    // const socket = io('https://talkware-backend.velloware.com', {
    //   query: {
    //     token: 'Anonymous',
    //   },
    // });
    // socket.on('connect', () => {
    //   console.log('Connected to server');
    // });
    // socket.on('disconnect', () => {
    //   console.log('Disconnected from server');
    // });
  }

  createElements() {
    const div = document.createElement('div');
    div.classList.add('chat');
    div.innerHTML = `
    <div id="chatContainer">
      <section class="section__chat">
      <h1>Chat: Global Room 1</h1>
      <textarea id="room" cols="30" rows="10" readonly></textarea>  
      <div>
        <input type="text" id="message"/>
        <button id="sender" type="button" class="button">Send</button>
      </div>
    </section>
  <div>`;
    document.body.appendChild(div);
    return div;
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

    #chatContainer {
      position: fixed;
      right: 0;
      bottom: 10;
      background: red;
      width: 35%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
    
    #chatContainer .section__chat h1 {
      color: var(--color-h2);
      font-size: 1em;
      margin-bottom: 0.5em;
      z-index: 999;
    }
    
    #chatContainer .section__chat textarea {
      background: var(--bg-input);
      color: var(--color-text);
      border: none;
      border-radius: 5px;
      padding: 10px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
        rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
      z-index: 999;
      margin-bottom: 100px;
    }
    
    #chatContainer .section__chat textarea:focus {
      outline: 0px solid transparent;
      box-shadow: rgba(150, 160, 138, 1) 0px 5px 7px -1px,
        rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }
    
    #chatContainer .section__chat button {
      color: var(--color-button);
      background: var(--bg-button);
      border: none;
      border-radius: 5px;
      padding: 10px;
      margin-top: 10px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      z-index: 999;

    }

  #chatContainer .section__chat input,
  textarea {
    border-radius: 5px;
    padding: 10px;
    border: none;
    color: var(--color-text);
    background-color: var(--bg-input);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
  
  #chatContainer .section__chat input:focus,
  textarea:focus {
    outline: 0px solid transparent;
    box-shadow: rgba(150, 160, 138, 1) 0px 5px 7px -1px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
  
    
  #chatContainer .section__chat {
      padding-top: 2em;
      text-align: center;
    }
    
    #chatContainer .section__chat textarea {
      width: 80%;
      height: 60%;
      margin-bottom: 20px;
      resize: none;
    }
    
    #chatContainer .section__chat div {
      display: flex;
      justify-content: center;
    }
    
    #chatContainer .section__chat div input {
      width: 60%;
      height: 30px;
    }
    
    #chatContainer .section__chat div button {
      margin-left: 4%;
      width: 16%;
    }`;

    document.head.appendChild(style);
  }

  build() {
    this.initSocket();
    this.createElements();
    this.injectStyles();
  }
}

export default StaticChat;
