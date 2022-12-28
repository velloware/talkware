/* eslint-disable no-undef */
export function getUserRooms() {
  let rooms;
  fetch('https://talkware-backend.velloware.com/rooms', {
    method: 'GET',
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
        rooms = data;
      });
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });

  return rooms;
}
