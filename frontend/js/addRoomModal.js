/* eslint-disable no-undef */

//Modal
const modal = document.getElementById('addRoomModal');

const btn = document.getElementById('CreateRoom');

const span = document.getElementsByClassName('close')[0];

btn.onclick = function () {
  modal.style.display = 'block';
};

span.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

// Create Room
const createRoom = () => {
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  const isPrivate = document.getElementById('isPrivate').value;

  const data = {
    name: name,
    // isPrivate: isPrivate == 'true' ? true : false,
    isPrivate: false,
    password: password,
  };

  fetch('https://talkware-backend.velloware.com/rooms', {
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
      // Examine the text in the response
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
