import { Router, Response, Request } from 'express';
import 'express-async-errors';

import CreateUserController from '../../../modules/User/useCases/CreateUser/infra/http/Controllers/CreateUserController';
import AuthUserController from '../../../modules/User/useCases/AuthenticateUser/infra/http/Controllers/LogInUserController';

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();

const users = Router();

users.post('/', createUserController.execute);
users.post('/auth', authUserController.execute);

users.use('/', (request: Request, response: Response) => {
  response.send({
    message: 'Welcome to route Users',
    status: 'ONLINE',
    version: '1.0.0',
    documentation: '/docs/users',
  });
});

export default users;
