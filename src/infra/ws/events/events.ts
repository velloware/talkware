import { Server, Socket } from "socket.io";
import { RoomEvents } from '../../../modules/Room/useCases/RoomChatManager/infra/ws/Events/RoomEvents';

export class EventsSocketIo {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public onConnection(socket: Socket) {
    console.log(`Connected: ${socket.id}`);
  }

  public onDisconnect(socket: Socket) {
    console.log("Disconnected");
  }

  public RegisterEvents() {

    this.io.on("connection", (socket) => {
      const roomEvents = new RoomEvents(socket);
      this.onConnection(socket);

      socket.on("disconnect", () => this.onDisconnect(socket));
      socket.on("joinChat", async (joinChatProps: any) => {

        await roomEvents
          .joinRoom(joinChatProps);

      });
    });

  }
}