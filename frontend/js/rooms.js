/* eslint-disable no-undef */
export async function getUserRooms() {
  const response = await fetch('https://talkware-backend.velloware.com/rooms', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('@token'),
    },
  });
  const rooms = await response.json();
  return rooms;
}
