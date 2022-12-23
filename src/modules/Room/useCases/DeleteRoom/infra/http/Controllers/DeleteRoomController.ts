import { Response, Request } from 'express';
import { RoomRepository } from '../../../../../repositories/prisma/RoomRepository';
import { AppError } from '../../../../../../../shared/Error/AppError';
import { DeleteRoom, IDeleteRoom } from '../../../DeleteRoom';

export default class DeleteRoomController {
  public async execute(request: Request, response: Response) {
    const deleteRoomsService = new DeleteRoom(new RoomRepository());
    const bodyParams: IDeleteRoom = request.body;

    if (!bodyParams) {
      throw new AppError('Your request Body is invalid', 400);
    }

    const result = await deleteRoomsService.delete(bodyParams);

    if (result.isLeft()) {
      throw new AppError(`Room not deleteed ${result.value.message}`);
    }

    request.debug(`Room deleteed -> Id = ${bodyParams.id}`);

    return response.status(201).json({
      message: 'Room deleted',
    });
  }
}
