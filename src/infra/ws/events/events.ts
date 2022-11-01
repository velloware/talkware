import { Server, Socket } from "socket.io";
import { RoomEvents } from '../../../modules/Room/useCases/Room/RoomEvents';

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
      this.onConnection(socket);

      socket.on("disconnect", () => this.onDisconnect(socket));
      socket.on("joinChat", (tokenUser: any) => {
        new RoomEvents(socket, tokenUser || {});
      });
    });

  }
}