import { Either, left, right } from '../../../../core/logic/Either';
import { IRoomRepository } from '../../repositories/IRoomRepository';
import { RoomDontFind } from '../Errors/RoomDontFind';

export interface IDeleteRoom {
  id: string;
}

export type deleteRoomReturns = Either<RoomDontFind, boolean>;

export class DeleteRoom {
  protected roomRepository: IRoomRepository;

  constructor(roomRepository: IRoomRepository) {
    this.roomRepository = roomRepository;
  }

  async delete(DeleteRoom: IDeleteRoom): Promise<deleteRoomReturns> {
    const removedRoom = await this.roomRepository.delete(DeleteRoom.id);

    if (!removedRoom) {
      return left(new RoomDontFind());
    }

    return removedRoom ? right(true) : left(new RoomDontFind());
  }
}
