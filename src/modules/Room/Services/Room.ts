import { Either, left, right } from '../../../core/logic/Either';
import { Room } from '../../Room/Domain/Room/Room';
import { roomDontExist } from './Errors/RoomsDontExist';

const Rooms = [
  new Room({
    id: '1',
    name: 'Global Room',
    messages: [],
    users: [],
    isPrivate: false,
    password: '',
    ownerId: '1',
  }),
  new Room({
    id: '2',
    name: 'Room 1 - John Doe',
    messages: [],
    users: [],
    isPrivate: false,
    password: '',
    ownerId: '1',
  }),
  new Room({
    id: '3',
    name: 'Room 2 - Glob',
    messages: [],
    users: [],
    isPrivate: false,
    password: '',
    ownerId: '1',
  }),
]

type RoomServiceReturn = Either<roomDontExist, Room>;

export class RoomService {
  constructor() { }

  findRoomById(RoomId: string): RoomServiceReturn {
    const rooms = Rooms.find(room => room.props.id === RoomId);

    if (!rooms) {
      return left(new roomDontExist());
    }

    return right(rooms);
  }
}