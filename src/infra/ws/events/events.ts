import { Server, Socket } from "socket.io";
import { RoomEvents } from './RoomEvents';
import { Chat } from '../../../modules/useCases/Chat/Chat';

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

      new RoomEvents(socket, this.initChat());
    });

  }

  public initChat() {
    const chat = new Chat();
    return {
      Room: chat.getRoomGlobal(),
      SudoClient: chat.getClientSudo(),
    }

  }
}