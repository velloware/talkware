import { Room } from './Room';
import { InvalidPropsError } from './Errors/InvalidPropsError';

describe('Test Room', () => {
  it('should create a room', () => {
    const room = Room.create({
      id: '1',
      name: 'room1',
      messages: [],
      users: [],
      isPrivate: false,
      password: '',
      ownerId: '1',
    });

    expect(room.isRight()).toBeTruthy();
  });
})