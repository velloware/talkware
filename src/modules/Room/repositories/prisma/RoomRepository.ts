import { Either, left, right } from '../../../../core/logic/Either';
import { Room } from '../../Domain/Room';
import { roomDontExist } from '../Errors/RoomsDontExist';
import { prisma } from '../../../../infra/prisma/client'
import { UserMapper } from '../../mappers/RoomMapper';

type RoomServiceReturn = Either<roomDontExist, Room>;
type RoomsReturn = Either<roomDontExist, Room[] | Room>;

export class RoomService {
  constructor() { }

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

  async findRoomById(RoomId: string): Promise<RoomServiceReturn> {
    const rooms = await prisma.room.findUnique({
      where: {
        id: RoomId
      }
    });

    if (!rooms) {
      return left(new roomDontExist());
    }

    const room = UserMapper.toDomain(rooms);

    if (!room) {
      return left(new roomDontExist());
    }

    return right(room);
  }

  async list(): Promise<RoomsReturn> {
    const rooms = await prisma.room.findMany();

    if (!rooms) {
      return left(new roomDontExist());
    }

    let roomsList: Room[] = [];

    for (const roomsMapped of rooms) {
      const room = UserMapper.toDomain(roomsMapped);

      if (!room) {
        return left(new roomDontExist());
      }

      roomsList.push(room);
    }

    return right(roomsList);
  }
}