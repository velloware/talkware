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

routes.use('/', (request: Request, response: Response) => {
  response.send({
    message: 'Welcome',
    status: 'ONLINE',
    version: '1.0.0',
    documentation: '/docs',
  });
});

export default routes;
