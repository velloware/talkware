import Server from './infra/http/server';
import { WebSocketServer } from './infra/ws/server';

const server = new Server(3333, false);

server.adpter(
  new WebSocketServer()
    .createWsServer()
);
server.init();
