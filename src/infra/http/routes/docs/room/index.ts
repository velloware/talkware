import createRoom from './createRoom.json';
import editRoom from './editRoom.json';

export const roomPaths = {
  '/rooms': {
    ...createRoom,
    ...editRoom,
  },
};
