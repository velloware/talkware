import { Response, Request } from 'express';
import { RoomRepository } from '../../../../../repositories/prisma/RoomRepository';
import { AppError } from '../../../../../../../shared/Error/AppError';
import { CreateRooom, ICreateRoom } from '../../../CreateRoom';

export default class CreateRoomController {
  public async execute(request: Request, response: Response) {
    const createRoomsService = new CreateRooom(new RoomRepository());
    const bodyParams: ICreateRoom = request.body;

    if (!bodyParams) {
      throw new AppError('Your request Body is invalid', 400);
    }
    if (!bodyParams.name) {
      throw new AppError(`Email is proprety required ${bodyParams.name}`, 400);
    }
    if (bodyParams.isPrivate) {
      if (!bodyParams.password) {
        throw new AppError(
          `IsPrivate need Password proprety ${bodyParams.isPrivate}`,
          400,
        );
      }
    }

    const { name, isPrivate, password } = bodyParams;

    const result = await createRoomsService.create({
      name,
      isPrivate,
      password,
      ownerId: request.user.id,
    });

    if (result.isLeft()) {
      throw new AppError(`Room not created ${result.value.message}`);
    }

    request.debug(`Room created -> Id = ${result.value.props.id}`);
    request.debug(`Logging in Room -> Id = ${result.value.props.id}`);

    return response.status(201).json({
      id: result.value.id,
      name: result.value.name,
      isPrivate: result.value.isPrivate,
      ownerId: result.value.ownerId,
    });
  }
}
