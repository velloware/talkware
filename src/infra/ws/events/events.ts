import { NewConnection } from '../../../modules/Client/useCases/NewConnection/NewConnection';
import { Server, Socket } from 'socket.io';
import {
  ConnectionManager,
  IJoinRoom,
} from '../../../modules/Client/useCases/ConnectionManager/ConnectionManager';
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
      const connectionManager = new ConnectionManager({
        data: socket.data,
        id: socket.id,
      });

      this.onConnection(socket);
      if (await connectionManager.connect()) {
        debug('connectconnectconnectconnect');

        socket.on('joinRoom', async (joinRoomProps: IJoinRoom) => {
          debug('joinRoomjoinRoomjoinRoomjoinRoom');
          await connectionManager.joinRoom(joinRoomProps);
        });
      }
      debug('Connected');

      socket.on('disconnect', () => this.onDisconnect(socket));
    });
  }
}
