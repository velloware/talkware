import createUser from './createUser.json';
import authUser from './authUser.json';

export const userPaths = {
  '/users': createUser,
  '/users/auth': authUser,
};
