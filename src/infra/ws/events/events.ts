import { NewConnection } from '../../../modules/Client/useCases/NewConnection/NewConnection';
import { Server, Socket } from 'socket.io';
import {
  RoomEvents,
  clientConnectProps,
} from '../../../modules/Room/useCases/RoomChatManager/infra/ws/Events/RoomEvents';
import ensureAuthenticated from '../middleware/EnsureAuthenticated';

export class EventsSocketIo {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.io.use(ensureAuthenticated);
  }

  public onConnection(socket: Socket) {
    console.log(`Connected: ${socket.id}`);
  }

  public onDisconnect(socket: Socket) {
    console.log('Disconnected');
  }

  public RegisterEvents() {
    this.io.on('connection', socket => {
      (async () => {
        // Using to try
        const connection = await new NewConnection({
          data: socket.data,
          id: socket.id,
        }).execute();

        if (connection.isLeft()) {
          return;
        }

        const client = connection.value;

        console.log(client);
      })();

      const roomEvents = new RoomEvents(socket);
      this.onConnection(socket);

      socket.on('disconnect', () => this.onDisconnect(socket));
      socket.on('joinChat', async (joinChatProps: clientConnectProps) => {
        await roomEvents.joinRoom(joinChatProps);
      });
    });
  }
}
