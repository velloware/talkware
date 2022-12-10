import { FindRoom } from './FindRoom';
import { CreateRoom } from '../../useCases/CreateRoom/CreateRoom';
import { InMemoryRoomRepository } from '../../repositories/InMemory/RoomRepository';

let RoomRepository: InMemoryRoomRepository;
let findRoom: FindRoom;
let createRoom: CreateRoom;

describe('FindRoom', () => {
  beforeEach(() => {
    RoomRepository = new InMemoryRoomRepository();
    createRoom = new CreateRoom(RoomRepository);
    findRoom = new FindRoom(RoomRepository);
  });

  it('should be able to FIND a room', async () => {
    const newRoom = await createRoom.create({
      isPrivate: false,
      name: 'Room 1',
      ownerId: '123',
      password: '123',
    });

    if (newRoom.isLeft()) {
      throw new Error('Room not created');
    }

    const room = await findRoom.findRoomByOwnerId('123');

    expect(room.isRight()).toBe(true);
  });
});
