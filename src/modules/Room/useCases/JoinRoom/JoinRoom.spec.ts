import { JoinRoom } from './JoinRoom';
import { CreateRoom } from '../../useCases/CreateRoom/CreateRoom';
import { InMemoryRoomRepository } from '../../repositories/InMemory/RoomRepository';

import { Room } from '../../Domain/Room';

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

  it('should be able to join in room with password', async () => {
    const newRoom = await createRoom.create({
      isPrivate: true,
      name: 'Room 13333',
      ownerId: '123',
      password: '77712',
    });

    if (newRoom.isLeft()) {
      throw new Error('Room not created');
    }

    const roomJoinded = await joinRoom.join({
      idRoom: newRoom.value.id,
      password: '77712',
      RoomsHasAcess: [],
    });

    expect(roomJoinded.isRight()).toBe(false);
    expect(roomJoinded.isLeft()).toBe(true);
  });

  it('should not be able to join in room with wrong password', async () => {
    const newRoom = await createRoom.create({
      isPrivate: true,
      name: 'Room 1',
      ownerId: '123',
      password: '123',
    });

    if (newRoom.isLeft()) {
      throw new Error('Room not created');
    }

    const roomJoinded = await joinRoom.join({
      idRoom: newRoom.value.id,
      password: '77712',
      RoomsHasAcess: [],
    });

    expect(roomJoinded.isRight()).toBe(false);
    expect(roomJoinded.isLeft()).toBe(true);
  });

  it('should be able to join in room use RoomsHasAcess', async () => {
    const newRoom = await createRoom.create({
      isPrivate: true,
      name: 'Room 113',
      ownerId: '123',
      password: '123',
    });

    if (newRoom.isLeft()) {
      throw new Error('Room not created');
    }

    const roomJoinded = await joinRoom.join({
      idRoom: newRoom.value.id,
      RoomsHasAcess: [newRoom.value],
    });

    expect(roomJoinded.isRight()).toBe(true);
    expect(roomJoinded.isLeft()).toBe(false);
  });
});
