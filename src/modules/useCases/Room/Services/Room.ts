import { Room } from '../../../Domain';
import { Chat } from '../../Chat/Chat';

const chat = new Chat();
const RoomGlobal = chat.getRoomGlobal();

const Rooms = [
  RoomGlobal,
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

export class RoomService {
  constructor() { }

  findRoomById(RoomId: string) {
    return Rooms.find(room => room.props.id === RoomId);
  }
}