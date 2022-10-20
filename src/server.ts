import Server from './infra/http/server';
import { WebSocketServer } from './infra/ws/server';

const server = new Server(5337, false);

server.adpter(
  new WebSocketServer()
    .createWsServer()
);
server.init();
