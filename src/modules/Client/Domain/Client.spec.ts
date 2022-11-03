import { Client } from './Client';
import { ClientDontCreate } from './Errors/ClientDontCreate';

describe('Test Client', () => {
  it('Should be a create Client isRight', () => {
    const client = Client.create({
      userId: 'userId',
      name: 'name',
    });

    if (client.isLeft()) {
      throw Error('client invalid');
    }

    expect(client.value).toBeInstanceOf(Client);
    expect(client.value.userId).toEqual('userId');
    expect(client.value.name).toEqual('name');

    client.value.SocketId = 'socketId';
    expect(client.value.socketId).toEqual('socketId');

    client.value.name = 'name2';
    expect(client.value.name).toEqual('name2');
  });

  it('Should be a not create Client isLeft', () => {
    const client = Client.create({
      userId: '',
      name: 'name',
    });

    if (client.isRight()) {
      throw Error('client valid');
    }

    expect(client.value.message).toEqual('CoreError > The Client Dont create is invalid');
    expect(client.value).toBeInstanceOf(ClientDontCreate);
  });
})