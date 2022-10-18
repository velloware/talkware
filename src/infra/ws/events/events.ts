import { Server, Socket } from "socket.io";
import { MessageEvents } from './MessageEvents';
import { ChatEvents } from './ChatEvents';

export class EventsSocketIo {
  private io: Server;
  constructor(io: Server) {
    this.io = io;
  }

  public emit(event: string, data: any) {
    this.io.emit(event, data);
  }

  public on(event: string, callback: (socket: Socket, data: any) => void) {
    this.io.on(event, (socket: Socket, data: any) => callback(socket, data));
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

      new MessageEvents(socket);
      new ChatEvents(socket);
    });
  }
}