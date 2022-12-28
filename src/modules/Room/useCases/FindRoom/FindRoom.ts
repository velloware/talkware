import { IRoomReturns } from 'modules/Room/interfaces/RoomReturns';
import { Either, right, left } from '../../../../core/logic/Either';
import { Room } from '../../Domain/Room';
import { IRoomRepository } from '../../repositories/IRoomRepository';
import { RoomDontFind } from '../Errors/RoomDontFind';

type FindRoomByOwnerIdReturn = Either<RoomDontFind, IRoomReturns[]>;

export interface IFindRoom {
  ownerId: string;
}

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

    const rooms: IRoomReturns[] = [];
    if (!Array.isArray(room)) {
      rooms.push({
        id: room.id,
        name: room.name,
        ownerId: room.ownerId,
      });
    }

    if (Array.isArray(room)) {
      room.forEach((room: Room) => {
        rooms.push({
          id: room.id,
          name: room.name,
          ownerId: room.ownerId,
        });
      });
    }

    return right(rooms);
  }
}
