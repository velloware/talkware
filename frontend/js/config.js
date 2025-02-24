/* eslint-disable no-undef */

let URLBACKEND = 'https://talkware-backend.velloware.com';
let URLFRONTEND = 'https://talkware.velloware.com';

console.log("Testse1");

if (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
) {
  URLBACKEND = 'http://localhost:5337';
  URLFRONTEND = 'http://127.0.0.1:5500';
}

export const config = {
  URLBACKEND,
  URLFRONTEND,
};
