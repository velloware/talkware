/* eslint-disable no-undef */
import { config } from './config.js';

export async function getUserRooms() {
  // if (
  //   !localStorage.getItem('@token') ||
  //   localStorage.getItem('@token') == 'Anonymous'
  // )
  //   return false;

  const response = await fetch(`${config.URLBACKEND}/rooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('@token'),
    },
  });

  if (response.status != 200) return false;

  const rooms = await response.json();

  if (!rooms) return false;

  return rooms;
}
