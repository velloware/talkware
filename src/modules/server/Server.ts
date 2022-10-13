import { WebSocketServer, IServer } from "./WebSocketServer";
import { Client } from './Client';
import { log } from '../Utils';

export class Server {

  protected Port: number;
  protected webSocketServer: WebSocketServer;
  protected Socket: IServer;
  protected Clients: Client[] = [];

  constructor(Port: number) {
    log(`> Server linsting in ${Port}`);
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

      log(`Server > new Client connected: ${socket.id}`);

      socket.on('voice', (data) => {
        socket.broadcast.emit('voicePush', data);
        log(`Server > voice: ${data}`);
      });

      socket.on('userData', (data) => {
        log(`Server > userData: ${data}`);
        this.Clients.forEach((client, index) => {
          if (client.socketId === socket.id) {
            this.Clients[index].name = data;
          }
        })
      });


      socket.on('stream', (data) => {
        log(`Server > voice: ${data} by ${socket.id}`);
      });

      socket.on('message', (data) => {
        log(`Server >> Message by ${socket.id} : ${data}`);
        const clientSend = this.Clients.find((client) => client.socketId === socket.id) || new Client({ name: 'unknown', socketId: socket.id });

        log(clientSend)

        socket.broadcast.emit('messageSender', `${clientSend.props.name || socket.id}: ${data.toString()}`);
      });

    });
  }



}







