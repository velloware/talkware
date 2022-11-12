import { Socket } from "socket.io";

export const wsLogger = (socket: Socket, text: string, action = "Action") => {
  console.log(`Websocket > [${socket.id}] < ${action} > [${text}]`);
}