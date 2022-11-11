import { Room } from './Room';
import { InvalidPropsError } from './Errors/InvalidPropsError';
import { Message } from '../../Message/Domain/Message';
import { Client } from '../../Client/Domain/Client';

describe('Test Room', () => {
  it('should create a room', () => {
    const room = Room.create({
      id: '1',
      name: 'room1',
      messages: [],
      clients: [],
      isPrivate: false,
      password: '',
      ownerId: '1',
    });

    expect(room.isRight()).toBeTruthy();
  });

  it('Should be create Room dont parse ID', () => {
    const room = Room.create({
      name: 'room1',
      messages: [],
      clients: [],
      isPrivate: false,
      password: '',
      ownerId: '1',
    });

    expect(room.isRight()).toBeTruthy();
  })

  it('Should not create a room with invalid props', () => {
    const room = Room.create({
      id: '1',
      name: '',
      messages: [],
      clients: [],
      isPrivate: false,
      password: '',
      ownerId: '1',
    });

    expect(room.isLeft()).toBeTruthy();
    expect(room.value).toBeInstanceOf(InvalidPropsError);
  });

  it('Should add a message to the room', () => {
    const room = Room.create({
      id: '1',
      name: 'room1',
      messages: [],
      clients: [],
      isPrivate: false,
      password: '',
      ownerId: '1',
    });

    expect(room.isRight()).toBeTruthy();

    if (room.isLeft()) { throw new Error('Room is not right'); }

    const message = Message.create({
      id: '1',
      data: 'message1',
      clientId: '1',
      roomId: '1',
    });

    if (message.isLeft()) { throw new Error('Message is not right'); }

    room.value.addMessage(message.value);

    expect(room.value.getMessages().length).toBe(1);
  });

  it('Should remove a message from the room', () => {
    const room = Room.create({
      id: '1',
      name: 'room1',
      messages: [],
      clients: [],
      isPrivate: false,
      password: '',
      ownerId: '1',
    });

    expect(room.isRight()).toBeTruthy();

    if (room.isLeft()) { throw new Error('Room is not right'); }

    const message = Message.create({
      id: '1',
      data: 'message1',
      roomId: '1',
      clientId: '1',
    });

    if (message.isLeft()) { throw new Error('Message is not right'); }

    room.value.addMessage(message.value);

    expect(room.value.getMessages().length).toBe(1);

    room.value.removeMessage('1');

    expect(room.value.getMessages().length).toBe(0);
  });

  it('Should get users connect to Room', () => {
    const room = Room.create({
      id: '1',
      name: 'room1',
      messages: [],
      clients: [],
      isPrivate: false,
      password: '',
      ownerId: '1',
    });

    expect(room.isRight()).toBeTruthy();

    if (room.isLeft()) { throw new Error('Room is not right'); }

    expect(room.value.getClients().length).toBe(0);

    const client = Client.create({
      name: '1test',
      userId: '1',
      id: '1'
    });

    if (client.isLeft()) {
      throw new Error('Client is not right');
    }

    room.value.addClient(client.value);

    expect(room.value.getClients().length).toBe(1);
  });

  it('Should be a get OnwerId to Room', () => {
    const room = Room.create({
      id: '1',
      name: 'room1',
      messages: [],
      clients: [],
      isPrivate: false,
      password: '',
      ownerId: '1',
    });

    expect(room.isRight()).toBeTruthy();

    if (room.isLeft()) { throw new Error('Room is not right'); }

    expect(room.value.getOwnerId()).toBe('1');
  });

  it('Remove a client from the room', () => {
    const room = Room.create({
      id: '1',
      name: 'room1',
      messages: [],
      clients: [],
      isPrivate: false,
      password: '',
      ownerId: '1',
    });

    expect(room.isRight()).toBeTruthy();

    if (room.isLeft()) { throw new Error('Room is not right'); }

    const client = Client.create({
      name: '1test',
      userId: '1',
      id: '1'
    });

    if (client.isLeft()) {
      throw new Error('Client is not right');
    }

    room.value.addClient(client.value);

    expect(room.value.getClients().length).toBe(1);

    room.value.removeClient('1');

    expect(room.value.getClients().length).toBe(0);
  });
})