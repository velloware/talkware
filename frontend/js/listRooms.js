/* eslint-disable no-undef */

const modal = document.getElementById('listRoomModal');
const btn = document.getElementById('ListRooms');
const span = document.getElementById('close-listRooms');

import { getUserRooms } from './rooms.js';

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

export function copyId(ThisElement) {
  // copy id to clipboard
  navigator.clipboard
    .writeText(`${ThisElement.explicitOriginalTarget.id}`)
    .then(
      () => {
        /* clipboard successfully set */
      },
      () => {
        /* clipboard write failed */
      },
    );
}

// add rooms in the list
const roomList = document.getElementById('listRooms');

const addRooms = async () => {
  const rooms = await getUserRooms();
  rooms.forEach(room => {
    // create a new div element
    const newDiv = document.createElement('div');
    newDiv.classList.add('room');
    newDiv.id = room.id;
    newDiv.innerHTML = `
      <h3>Name: <span id="${room.id}">${room.name}</span></h3>
      <button class="button" class="joinRoom" id="${room.id}">Join</button>
      <button class="button" class="copyId" id="${room.id}">Copy Id</button>
      <button class="button" class="copyLink" id="${room.id}">Copy LInk</button>`;
    roomList.appendChild(newDiv);
    document.getElementById(`${room.id}`).addEventListener('click', copyId);
  });
};

addRooms();
