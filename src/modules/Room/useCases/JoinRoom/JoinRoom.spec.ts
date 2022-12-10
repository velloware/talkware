import { JoinRoom } from './JoinRoom';
import { CreateRoom } from '../../useCases/CreateRoom/CreateRoom';
import { InMemoryRoomRepository } from '../../repositories/InMemory/RoomRepository';

let RoomRepository: InMemoryRoomRepository;
let joinRoom: JoinRoom;
let createRoom: CreateRoom;

describe('JoinRoom', () => {
  beforeEach(() => {
    RoomRepository = new InMemoryRoomRepository();
    createRoom = new CreateRoom(RoomRepository);
    joinRoom = new JoinRoom(RoomRepository);
  });

  it('should be able to join in room', async () => {
    const newRoom = await createRoom.create({
      isPrivate: false,
      name: 'Room 1',
      ownerId: '123',
      password: '123',
    });

    if (newRoom.isLeft()) {
      throw new Error('Room not created');
    }

    const roomJoinded = await joinRoom.join({
      idRoom: newRoom.value.id,
      password: '123',
      RoomsHasAcess: [],
    });

    expect(roomJoinded.isRight()).toBe(true);
  });

  it('should not be able to join in room', async () => {
    const roomJoinded = await joinRoom.join({
      idRoom: '123123123123123123123123123',
      password: '123',
      RoomsHasAcess: [],
    });

    expect(roomJoinded.isRight()).toBe(false);
    expect(roomJoinded.isLeft()).toBe(true);
  });
});
