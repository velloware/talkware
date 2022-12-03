import { Server, Socket } from 'socket.io';
import {
  ConnectionManager,
  IJoinRoom,
} from '../../../modules/Client/useCases/ConnectionManager/ConnectionManager';
import { ConnectionManagerController } from '../../../modules/Client/useCases/ConnectionManager/infra/ws/Controllers/ConnectionManagerController';
import ensureAuthenticated from '../middleware/EnsureAuthenticated';

import Debug from 'debug';

const debug = Debug('app:socket');

export class EventsSocketIo {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.io.use(ensureAuthenticated);
  }

  public onConnection(socket: Socket) {
    debug(`Connected: ${socket.id}`);
  }

  public onDisconnect(socket: Socket) {
    debug('Disconnected');
  }

  public RegisterEvents() {
    this.io.on('connection', async socket => {
      const connectionManagerController = new ConnectionManagerController(
        socket,
        new ConnectionManager({
          data: socket.data,
          id: socket.id,
        }),
      );

      this.onConnection(socket);
      if (!(await connectionManagerController.connectionManager.connect())) {
        socket.disconnect();
        return;
      }

      socket.on('disconnect', () => this.onDisconnect(socket));
    });
  }
}
