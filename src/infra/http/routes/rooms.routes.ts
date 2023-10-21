import { Router, Response, Request } from 'express';
import 'express-async-errors';

import CreateRoomController from '../../../modules/Room/useCases/CreateRoom/infra/http/Controllers/CreateRoomController';
import EditRoomController from '../../../modules/Room/useCases/EditRoom/infra/http/Controllers/EditRoomController';
import DeleteRoomController from '../../../modules/Room/useCases/DeleteRoom/infra/http/Controllers/DeleteRoomController';
import FindRoomController from '../../../modules/Room/useCases/FindRoom/infra/http/Controllers/FindRoomController';
import ensureAuthenticated from '../middlewares/EnsureAuthenticated';

const createRoomController = new CreateRoomController();
const editRoomController = new EditRoomController();
const deleteRoomController = new DeleteRoomController();
const findRoomController = new FindRoomController();

const rooms = Router();

rooms.post('/', ensureAuthenticated, createRoomController.execute);
rooms.put('/', ensureAuthenticated, editRoomController.execute);
rooms.delete('/', ensureAuthenticated, deleteRoomController.execute);
rooms.get('/', ensureAuthenticated, findRoomController.execute);

rooms.use('/', (request: Request, response: Response) => {
  response.send({
    message: 'Welcome to route Rooms',
    status: 'ONLINE',
    version: '1.0.0',
    documentation: '/rooms/docs',
  });
});

export default rooms;
