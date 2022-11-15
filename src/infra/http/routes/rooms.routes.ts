import {
  Router, Response, Request,
} from 'express';
import 'express-async-errors';

import CreateRoomController from '../../../modules/Room/useCases/CreateRoom/infra/http/Controllers/CreateRoomController';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

const createRoomController = new CreateRoomController();

const rooms = Router();

rooms.post('/', ensureAuthenticated, createRoomController.execute);

rooms.get('/docs', (request: Request, response: Response) => {
  response.status(200).json({
    message: 'Welcome to route Rooms',
    status: 'ONLINE',
    version: '1.0.0',
    rooms: {
      post: {
        '/rooms': {
          description: 'Create a new room',
          body: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Room name',
              },
              isPrivate: {
                type: 'boolean',
                description: 'Room is private',
              },
              password: {
                type: 'string',
                description: 'Room password',
              },
            },
          },
          response: {
            201: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'Room id',
                },
                name: {
                  type: 'string',
                  description: 'Room name',
                },
                isPrivate: {
                  type: 'boolean',
                  description: 'Room is private',
                },
                ownerId: {
                  type: 'string',
                  description: 'Room owner id',
                },
                clients: {
                  type: 'array',
                  description: 'Room clients',
                },
                messages: {
                  type: 'array',
                  description: 'Room messages',
                },
              },
            },
          },
        },
      },
    },
  });
});

rooms.use('/', (request: Request, response: Response) => {
  response.send({
    message: 'Welcome to route Rooms',
    status: 'ONLINE',
    version: '1.0.0',
    documentation: '/rooms/docs',
  });
});

export default rooms;