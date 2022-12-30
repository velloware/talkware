/* eslint-disable no-undef */
import { config } from './config.js';

const modal = document.getElementById('addRoomModal');
const btn = document.getElementById('CreateRoom');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function () {
  console.log(modal.classList);
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

const createRoom = () => {
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  const isPrivate = document.getElementById('isPrivate').value;

  if (!localStorage.getItem('@token')) {
    // redirect to login
    window.location.href = '/login.html';
    return;
  }

  const data = {
    name: name,
    // isPrivate: isPrivate == 'true' ? true : false,
    isPrivate: false,
    password: password,
  };

  fetch(`${config.URLBACKEND}/rooms`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('@token'),
    },
  })
    .then(function (response) {
      if (response.status !== 200 && response.status !== 201) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status,
        );
        return;
      }
      response.json().then(function (data) {
        console.log(data);
        alert(`Room created! use ${data.id} to join!`);
      });
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });
};

document
  .getElementById('createRoomButton')
  .addEventListener('click', createRoom);

const buttonQuit = document.querySelector('.section__quit-active');

buttonQuit.addEventListener('click', () => {
  buttonQuit.classList.toggle('quit__button-press');
  const sectionQuit = document.querySelector('.quit__div');
  sectionQuit.classList.toggle('section__quit-hidden');
});
