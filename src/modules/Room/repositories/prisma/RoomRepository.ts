import { Either, left, right } from '../../../../core/logic/Either';
import { Room } from '../../Domain/Room';
import { roomDontExist } from '../Errors/RoomsDontExist';
import { prisma } from '../../../../infra/prisma/client'
import { RoomMapper } from '../../mappers/RoomMapper';
import { IRoomRepository } from '../IRoomRepository';

type RoomServiceReturn = Either<roomDontExist, Room>;
type RoomsReturn = Either<roomDontExist, Room[] | Room>;

export class RoomRepository implements IRoomRepository {

  async exists(id: string): Promise<boolean> {
    const room = await prisma.room.findUnique({
      where: {
        id
      }
    });

    if (!room) {
      return false;
    }

    return true;
  }

  create(room: Room): void {
    prisma.room.create({
      data: {
        id: room.props.id,
        name: room.props.name,
        isPrivate: room.props.isPrivate,
        password: room.props.password,
        ownerId: room.props.ownerId,
      }
    })
  }

  async save(room: Room): Promise<void> {
    await prisma.room.update({
      where: {
        id: room.props.id
      },
      data: {
        name: room.props.name,
        isPrivate: room.props.isPrivate,
        password: room.props.password,
        ownerId: room.props.ownerId,
      }
    });
  }

  async findRoomById(RoomId: string): Promise<Room | null> {
    const rooms = await prisma.room.findUnique({
      where: {
        id: RoomId
      }
    });

    if (!rooms) {
      return null;
    }

    const room = RoomMapper.toDomain(rooms);

    if (!room) {
      return null;
    }

    return room;
  }

  async list(): Promise<RoomsReturn> {
    const rooms = await prisma.room.findMany();

    if (!rooms) {
      return left(new roomDontExist());
    }

    let roomsList: Room[] = [];

    for (const roomsMapped of rooms) {
      const room = RoomMapper.toDomain(roomsMapped);

      if (!room) {
        return left(new roomDontExist());
      }

      roomsList.push(room);
    }

    return right(roomsList);
  }


}