import { SocketDataClient } from '../../modules/Client/useCases/NewConnection/NewConnection';
import { Server } from 'socket.io';
export { Server as ISockeIServer } from 'socket.io';
import * as http from 'http';

import { EventsSocketIo } from './events/events';

export class WebSocketServer {
  constructor() {
    // ...
  }

  createWsServer(httpServer: http.Server): Server {
    const socket = new Server<SocketDataClient>(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    this.attachRoutes(socket);

    return socket;
  }

  attachRoutes(socket: Server) {
    new EventsSocketIo(socket).RegisterEvents();
  }

  close(server: Server) {
    server.close();
  }
}
