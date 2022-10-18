import { Socket } from "socket.io";

export class MessageEvents {
  constructor(private socket: Socket) {
    // this.socket.on("connectionMessage", (socket) => this.onConnection(socket));
    this.socket.on("message", (message) => this.onMessage(message));
  }

  public onConnection(socket: Socket) {
    console.log(`Connected Message: ${socket.id}`);
  }

  onMessage(message: string) {
    console.log("Message", message);
  }
}