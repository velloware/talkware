/* eslint-disable no-undef */

const modal = document.getElementById('listRoomModal');
const btn = document.getElementById('ListRooms');
const span = document.getElementById('close-listRooms');

import { getUserRooms } from './rooms.js';
import { config } from './config.js';

btn.onclick = function () {
  modal.classList.remove('modal-hidden');
};

span.onclick = function () {
  modal.classList.add('modal-hidden');
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.add('modal-hidden');
  }
};

export function copy(wantCopy) {
  return () => {
    navigator.clipboard.writeText(`${wantCopy}`).then(
      () => {
        /* clipboard successfully set */
      },
      () => {
        alert(`${wantCopy}`);
      },
    );
  };
}

const roomList = document.getElementById('listRooms');

const addRooms = async () => {
  const rooms = await getUserRooms();

  if (!rooms || !rooms.length) return;

  rooms.forEach(room => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('room');
    newDiv.id = room.id;
    newDiv.innerHTML = `
      <h3>Name: <span id="${room.id}">${room.name}</span></h3>
      <button class="button" class="joinRoom" id="${room.id}">Join</button>
      <button class="button" name="${room.id}copyId" id="${room.id}">Copy Id</button>
      <button class="button" name="${room.id}copyLink" id="${room.id}">Copy Link</button>`;
    roomList.appendChild(newDiv);

    document
      .getElementsByName(`${room.id}copyId`)[0]
      .addEventListener('click', copy(`${room.id}`));

    document
      .getElementsByName(`${room.id}copyLink`)[0]
      .addEventListener('click', copy(`${config.URLFRONTEND}?room=${room.id}`));
  });
};

addRooms();
