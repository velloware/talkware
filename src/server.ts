import Server from './infra/http/server';
import { WebSocketServer } from './infra/ws/server';
import dotenv from 'dotenv';
import Debug from 'debug';

const debug = Debug('app:server');

dotenv.config();

const server = new Server(process.env.PORT || 5337, false);

const webSocketServerManager = new WebSocketServer();
const wsServer = webSocketServerManager.createWsServer();

server.adpter(wsServer);
server.init();

process.on('SIGTERM', () => {
  debug(
    '> Server ending after close all connections - ',
    new Date().toISOString(),
  );
  webSocketServerManager.close(wsServer);
  server.close(() => process.exit());
});

process.on('SIGINT', () => {
  debug('> Server ending now! - ', new Date().toISOString());
  webSocketServerManager.close(wsServer);
  server.close(() => process.exit());
  process.exit();
});
