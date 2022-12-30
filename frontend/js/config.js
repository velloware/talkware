/* eslint-disable no-undef */

let URLBACKEND = 'https://talkware-backend.velloware.com';

if (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
) {
  URLBACKEND = 'http://localhost:5337';
}

export const config = {
  URLBACKEND,
};
