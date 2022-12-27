import { Response, Request } from 'express';
import { RoomRepository } from '../../../../../repositories/prisma/RoomRepository';
import { AppError } from '../../../../../../../shared/Error/AppError';
import { EditRoom, IEditRoom } from '../../../EditRoom';

export default class EditRoomController {
  public async execute(request: Request, response: Response) {
    const editRoomsService = new EditRoom(new RoomRepository());
    const bodyParams: IEditRoom = request.body;

    if (!bodyParams) {
      throw new AppError('Your request Body is invalid', 400);
    }

    if (bodyParams.isPrivate) {
      if (!bodyParams.password) {
        throw new AppError(
          `IsPrivate need Password proprety ${bodyParams.isPrivate}`,
          400,
        );
      }
    }

    const result = await editRoomsService.edit(bodyParams);

    if (result.isLeft()) {
      throw new AppError(`Room not edited ${result.value.message}`);
    }

    request.debug(`Room edited -> Id = ${result.value.props.id}`);

    return response.status(200).json({
      id: result.value.id,
      name: result.value.name,
      isPrivate: result.value.isPrivate,
      ownerId: result.value.ownerId,
    });
  }
}
