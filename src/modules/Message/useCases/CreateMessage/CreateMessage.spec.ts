import { CreateMessage } from './CreateMessage';

describe('CreateMessage', () => {
  it('should be able to create a new message', async () => {
    const createMessage = new CreateMessage();

    const message = await createMessage.create({
      data: 'test',
      clientId: '1',
      roomId: '1',
    });

    expect(message.isRight()).toBeTruthy();
  });

  it('should not be able to create a new message with invalid data', async () => {
    const createMessage = new CreateMessage();

    const message = await createMessage.create({
      data: '',
      clientId: '1',
      roomId: '1',
    });

    expect(message.isLeft()).toBeTruthy();
  });
});
