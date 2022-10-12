import { Server, Socket } from "socket.io";
export { Server as IServer } from "socket.io";

export class WebSocketServer {
  private PORT: number;

  constructor(Port: number) {
    this.PORT = Port;
  }

  createWsServer(): Server {
    const socket = new Server(this.PORT, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    socket.on("connect", (socket) => {
      console.log(`> Server >> User connect using SocketId = ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`> Server >> User disconnect using SocketId = ${socket.id}`);
      });

    });

    return socket;
  }
}