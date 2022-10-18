import {
  Router, Response, Request,
} from 'express';
import 'express-async-errors';

export const routesCreator = Router();

const routes = Router();

// Create docs route for json schem of routes
routes.use('/docs', (request: Request, response: Response) => {
  response.json(routesCreator.stack);
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
