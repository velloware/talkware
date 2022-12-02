import { Socket } from 'socket.io';

import Debug from 'debug';

const debug = Debug('app:socket');

export const wsLogger = (socket: Socket, text: string, action = 'Action') => {
  debug(`Websocket > [${socket.id}] < ${action} > [${text}]`);
};
