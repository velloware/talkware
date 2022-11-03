import { MessageDontCreate } from './Errors/MessageDontCreate';
import { Message } from './Message';

describe('Test Message', () => {

  it('Should be a create Message isRight', () => {
    const message = Message.create({
      id: 'id',
      data: 'data',
      roomId: 'roomId',
      userId: 'userId',
    });

    if (message.isLeft()) {
      throw Error('message invalid');
    }

    expect(message.value).toBeInstanceOf(Message);
    expect(message.value.id).toEqual('id');
    expect(message.value.data).toEqual('data');
    expect(message.value.roomId).toEqual('roomId');
    expect(message.value.userId).toEqual('userId');
  });

  it('Should be a not create Message isLeft', () => {
    const message = Message.create({
      id: "",
      data: 'data',
      roomId: 'roomId',
      userId: 'userId',
    });

    if (message.isRight()) {
      throw Error('message valid');
    }

    expect(message.value.message).toEqual('CoreError > The Message Dont create is invalid');
    expect(message.value).toBeInstanceOf(MessageDontCreate);
  });

})
