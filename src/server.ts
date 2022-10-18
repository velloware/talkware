// import { Server } from './modules/server';
import Server from './infra/http/server';
import { WebSocketServer } from './infra/ws/server';

const server = new Server(3333, false);

server.adpter(new WebSocketServer().createWsServer());
server.init();

// new Server(5337).build();
