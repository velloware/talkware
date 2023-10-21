import { Server, Socket } from 'socket.io';
import { ConnectionManager } from '../../../modules/Client/useCases/ConnectionManager/ConnectionManager';
import ensureAuthenticated from '../middleware/EnsureAuthenticated';
import Debug from 'debug';
import { Handler } from '../Handlers/handler';

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

  public onDisconnect() {
    debug('Disconnected');
  }

  public RegisterEvents() {
    this.io.on('connection', async socket => {
      const handler = new Handler(
        socket,
        new ConnectionManager({
          data: socket.data,
          id: socket.id,
        }),
      );

      this.onConnection(socket);
      if (!(await handler.connectionManager.connect())) {
        socket.disconnect();
        return;
      }

      socket.on('disconnect', () => this.onDisconnect());
    });
  }
}
