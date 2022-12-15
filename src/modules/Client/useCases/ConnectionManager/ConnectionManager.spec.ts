import { ConnectionManager } from './ConnectionManager';
import { CreateINewConnection } from '../NewConnection/NewConnection';

import { CreateRoom } from '../../../Room/useCases/CreateRoom/CreateRoom';
import { InMemoryRoomRepository } from '../../../Room/repositories/InMemory/RoomRepository';
import { JoinRoom } from '../../../Room/useCases/JoinRoom/JoinRoom';

let RoomRepository: InMemoryRoomRepository;
let createRoom: CreateRoom;
let joinRoom: JoinRoom;

describe('ConnectionManager', () => {
  beforeEach(() => {
    RoomRepository = new InMemoryRoomRepository();
    joinRoom = new JoinRoom(RoomRepository);
    createRoom = new CreateRoom(RoomRepository);
  });

  const createINewConnection: CreateINewConnection = {
    data: {
      anonymous: true,
    },
    id: '123',
  };

  it('should be able to connect', async () => {
    const connectionManager = new ConnectionManager(createINewConnection);
    const connect = await connectionManager.connect();
    expect(connect).toBe(true);
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

    const connectionManager = new ConnectionManager(
      createINewConnection,
      joinRoom,
    );
    const connect = await connectionManager.connect();

    if (!connect) {
      throw new Error('Connection not created');
    }

    connectionManager.joinRoom({
      idRoom: newRoom.value.id,
      password: '123',
      RoomsHasAcess: [],
    });
  });
});
