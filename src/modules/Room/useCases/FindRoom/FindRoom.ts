import { Either, right, left } from '../../../../core/logic/Either';
import { Room } from '../../Domain/Room';
import { IRoomRepository } from '../../repositories/IRoomRepository';
import { RoomDontFind } from './Errors/RoomDontFind';

type FindRoomByOwnerIdReturn = Either<RoomDontFind, Room | Room[]>;

export class FindRoom {
  protected roomRepository: IRoomRepository;

  constructor(roomRepository: IRoomRepository) {
    this.roomRepository = roomRepository;
  }

  async findRoomByOwnerId(ownerId: string): Promise<FindRoomByOwnerIdReturn> {
    const room = await this.roomRepository.findRoomByOwnerId(ownerId);

    if (!room) {
      return left(new RoomDontFind());
    }

    return right(room);
  }
}
