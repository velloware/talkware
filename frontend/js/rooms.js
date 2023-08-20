/* eslint-disable no-undef */
import { config } from './config.js';

export async function getUserRooms() {
  const response = await fetch(`${config.URLBACKEND}/rooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('@token'),
    },
  });

  const rooms = await response.json();

  if (!rooms) return false;

  return rooms;
}
