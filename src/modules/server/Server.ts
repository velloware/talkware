import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { WebSocketServer, IServer } from "./WebSocketServer";
import { Client } from './Client';

export class Server {

  protected Port: number;
  protected webSocketServer: WebSocketServer;
  protected Socket: IServer;
  protected Clients: Client[] = [];

  constructor(Port: number) {
    console.log(`> Server linsting in ${Port}`);
    this.Port = Port;
    this.webSocketServer = new WebSocketServer(this.Port);
    this.Socket = this.webSocketServer.createWsServer();
  }

  get list() {
    return this.Clients;
  }

  build() {

    this.Socket.on('connect', async (socket) => {

      this.Clients.push(new Client({
        name: socket.id,
        socketId: socket.id
      }));

      console.log(`Server > new Client connected: ${socket.id}`);

      socket.on('voice', (data) => {

        socket.broadcast.emit('voicePush', data);

        // this.Clients.forEach(client => {

        //   if (client.socketId != socket.id) {
        //     this.Socket.to(client.socketId).emit('voicePush', data);
        //   }

        // });

        console.log(`Server > voice: ${data}`);
      });


    });
  }



}







