import { Router, Response, Request } from 'express';
import 'express-async-errors';

import users from './users.routes';
import rooms from './rooms.routes';
import docs from './docs.routes';

export const routesCreator = Router();

const routes = Router();

//Users
routes.use('/users', users);

//Rooms
routes.use('/rooms', rooms);

// Create docs route for json schem of routes'
routes.use('/docs', docs);

// routes.use('/docs', (request: Request, response: Response) => {
//   response.status(200).json({
//     users: {
//       post: {
//         '/users': {
//           description: 'Create a new user',
//           body: {
//             type: 'object',
//             properties: {
//               username: {
//                 type: 'string',
//                 description: 'User username',
//               },
//               email: {
//                 type: 'string',
//                 description: 'User email',
//               },
//               password: {
//                 type: 'string',
//                 description: 'User password',
//               },
//             },
//           },
//           response: {
//             201: {
//               type: 'object',
//               properties: {
//                 id: {
//                   type: 'string',
//                   description: 'User id',
//                 },
//                 username: {
//                   type: 'string',
//                   description: 'User username',
//                 },
//                 email: {
//                   type: 'string',
//                   description: 'User email',
//                 },
//                 token: {
//                   type: 'string',
//                   description: 'User token',
//                 },
//               },
//             },
//           },
//         },
//         '/users/auth': {
//           description: 'Authenticate a user',
//           body: {
//             type: 'object',
//             properties: {
//               email: {
//                 type: 'string',
//                 description: 'User email',
//               },
//               password: {
//                 type: 'string',
//                 description: 'User password',
//               },
//             },
//             response: {
//               200: {
//                 type: 'object',
//                 properties: {
//                   message: {
//                     type: 'string',
//                     description: 'User message',
//                   },
//                   token: {
//                     type: 'string',
//                     description: 'User token',
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     rooms: {
//       post: {
//         '/rooms': {
//           description: 'Create a new room',
//           body: {
//             type: 'object',
//             properties: {
//               name: {
//                 type: 'string',
//                 description: 'Room name',
//               },
//               isPrivate: {
//                 type: 'boolean',
//                 description: 'Room is private',
//               },
//               password: {
//                 type: 'string',
//                 description: 'Room password',
//               },
//             },
//           },
//           response: {
//             201: {
//               type: 'object',
//               properties: {
//                 id: {
//                   type: 'string',
//                   description: 'Room id',
//                 },
//                 name: {
//                   type: 'string',
//                   description: 'Room name',
//                 },
//                 isPrivate: {
//                   type: 'boolean',
//                   description: 'Room is private',
//                 },
//                 ownerId: {
//                   type: 'string',
//                   description: 'Room owner id',
//                 },
//                 clients: {
//                   type: 'array',
//                   description: 'Room clients',
//                 },
//                 messages: {
//                   type: 'array',
//                   description: 'Room messages',
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   });
// });

routes.use('/', (request: Request, response: Response) => {
  response.send({
    message: 'Welcome',
    status: 'ONLINE',
    version: '1.0.0',
    documentation: '/docs',
  });
});

export default routes;
