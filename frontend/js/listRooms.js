/* eslint-disable no-undef */

const modal = document.getElementById('listRoomModal');
const btn = document.getElementById('ListRooms');
const span = document.getElementById('close-listRooms');

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
