import { CreateRoom } from './CreateRoom';
import { Room } from '../../Domain/Room';
import { InMemoryRoomRepository } from '../../repositories/InMemory/RoomRepository';

let RoomRepository: InMemoryRoomRepository;
let createRoom: CreateRoom;

describe('CreateRoom', () => {
  beforeEach(() => {
    RoomRepository = new InMemoryRoomRepository();
    createRoom = new CreateRoom(RoomRepository);
  });

  it('should be a create room', async () => {
    const room = await createRoom.create({
      name: '123',
      isPrivate: true,
      password: '123',
      ownerId: '123',
    });

    expect(room.isRight()).toBe(true);
    expect(room.value).toBeInstanceOf(Room);
  });
});
