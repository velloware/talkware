import {
  Router, Response, Request,
} from 'express';
import 'express-async-errors';

import users from './users.routes';

export const routesCreator = Router();

const routes = Router();

//Users
routes.use('/users', users);

// Create docs route for json schem of routes
routes.use('/docs', (request: Request, response: Response) => {
  response.status(200).json({
    users: {
      post: {
        '/users': {
          description: 'Create a new user',
          body: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                description: 'User username',
              },
              email: {
                type: 'string',
                description: 'User email',
              },
              password: {
                type: 'string',
                description: 'User password',
              },
            },
          },
          response: {
            201: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  description: 'User id',
                },
                username: {
                  type: 'string',
                  description: 'User username',
                },
                email: {
                  type: 'string',
                  description: 'User email',
                },
                token: {
                  type: 'string',
                  description: 'User token',
                },
              },
            },
          },
        },
        '/users/auth': {
          description: 'Authenticate a user',
          body: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'User email',
              },
              password: {
                type: 'string',
                description: 'User password',
              },
            },
            response: {
              200: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'User message',
                  },
                  token: {
                    type: 'string',
                    description: 'User token',
                  },
                },
              },
            },
          },
        },
      },
    }
  });
});

routes.use('/', (request: Request, response: Response) => {
  response.send({
    message: 'Welcome',
    status: 'ONLINE',
    version: '1.0.0',
    documentation: '/docs',
  });
});

export default routes;
