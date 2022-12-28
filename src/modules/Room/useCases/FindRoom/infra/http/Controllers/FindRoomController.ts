import { Response, Request } from 'express';
import { RoomRepository } from '../../../../../repositories/prisma/RoomRepository';
import { AppError } from '../../../../../../../shared/Error/AppError';
import { FindRoom } from '../../../FindRoom';

export default class FindRoomController {
  public async execute(request: Request, response: Response) {
    const createRoomsService = new FindRoom(new RoomRepository());

    const result = await createRoomsService.findRoomByOwnerId(request.user.id);

    if (result.isLeft()) {
      throw new AppError(`Room not created ${result.value.message}`);
    }

    request.debug(`FindRoomController -> IdOwener = ${request.user.id}`);

    return response.status(201).json(result.value);
  }
}
