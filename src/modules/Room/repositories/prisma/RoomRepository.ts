import { Either, left, right } from '../../../../core/logic/Either';
import { Room } from '../../Domain/Room';
import { roomDontExist } from '../Errors/RoomsDontExist';
import { prisma } from '../../../../infra/prisma/client';
import { RoomMapper } from '../../mappers/RoomMapper';
import { IRoomRepository } from '../IRoomRepository';

type RoomServiceReturn = Either<roomDontExist, Room>;
type RoomsReturn = Either<roomDontExist, Room[] | Room>;

export class RoomRepository implements IRoomRepository {
  async exists(id: string): Promise<boolean> {
    const room = await prisma.room.findUnique({
      where: {
        id,
      },
    });

    if (!room) {
      return false;
    }

    return true;
  }

  async create(room: Room): Promise<void> {
    await prisma.room.create({
      data: {
        id: room.id,
        name: room.name,
        isPrivate: room.isPrivate,
        password: room.password,
        ownerId: room.ownerId,
      },
    });
  }

  async save(room: Room): Promise<void> {
    await prisma.room.update({
      where: {
        id: room.props.id,
      },
      data: {
        name: room.props.name,
        isPrivate: room.props.isPrivate,
        password: room.props.password,
        ownerId: room.props.ownerId,
      },
    });
  }

  async findRoomById(RoomId: string): Promise<Room | null> {
    const rooms = await prisma.room.findUnique({
      where: {
        id: RoomId,
      },
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

  async findRoomByOwnerId(userId: string): Promise<Room[] | Room | null> {
    const rooms = await prisma.room.findMany({
      where: {
        ownerId: userId,
      },
    });

    if (!rooms) {
      return null;
    }

    if (rooms.length === 1) {
      const room = RoomMapper.toDomain(rooms[0]);

      if (!room) {
        return null;
      }

      return room;
    }

    const roomsList: Room[] = [];

    for (const roomsMapped of rooms) {
      const room = RoomMapper.toDomain(roomsMapped);

      if (!room) {
        return null;
      }

      roomsList.push(room);
    }

    return roomsList;
  }

  async list(): Promise<RoomsReturn> {
    const rooms = await prisma.room.findMany();

    if (!rooms) {
      return left(new roomDontExist());
    }

    const roomsList: Room[] = [];

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
