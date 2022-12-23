import { IRoomRepository } from '../../repositories/IRoomRepository';
import { RoomRepository } from '../../repositories/prisma/RoomRepository';
import { Either, left, right } from '../../../../core/logic/Either';
import { Room } from '../../Domain/Room';

import { JoinRoomError } from '../Errors/JoinRoomError';

export interface IJoinRoom {
  idRoom: string;
  password?: string;
  RoomsHasAcess?: Room[];
}

type JoinRoomReturn = Either<JoinRoomError, Room>;

export class JoinRoom {
  protected roomRepository: IRoomRepository;

  constructor(roomRepository: IRoomRepository = new RoomRepository()) {
    this.roomRepository = roomRepository;
  }

  public async join(joinRoomProps: IJoinRoom): Promise<JoinRoomReturn> {
    const { idRoom, password, RoomsHasAcess } = joinRoomProps;

    const roomAttach = await this.roomRepository.findRoomById(idRoom);

    if (!roomAttach) {
      return left(new JoinRoomError());
    }

    if (roomAttach.isPrivate) {
      if (RoomsHasAcess && RoomsHasAcess.length > 0) {
        const room = RoomsHasAcess.find(room => room.id === idRoom);

        if (!room) {
          return left(new JoinRoomError());
        }

        roomAttach.props.password = '*********';

        return right(room);
      } else {
        if (password && (await roomAttach.comparePassword(password))) {
          roomAttach.props.password = '*********';

          return right(roomAttach);
        } else {
          return left(new JoinRoomError());
        }
      }
    }

    roomAttach.props.password = '*********';

    return right(roomAttach);
  }
}
