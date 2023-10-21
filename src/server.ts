import dotenv from 'dotenv';
dotenv.config();

if (process.env.NODE_ENV === 'production') {
  require('newrelic');
}

import Server from './infra/http/server';
import { WebSocketServer } from './infra/ws/server';
import Debug from 'debug';

const debug = Debug('app:server');

const server = new Server(process.env.PORT || 5337, false);

const webSocketServerManager = new WebSocketServer();
const wsServer = webSocketServerManager.createWsServer(server.getServer());

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
