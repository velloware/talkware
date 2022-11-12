import { Client } from './Client';
import { ClientDontCreate } from './Errors/ClientDontCreate';

describe('Test Client', () => {
  it('Should be a create Client isRight', () => {
    const client = Client.create({
      id: 'idUser',
      name: 'name',
      userId: 'userId',
    });

    const client2 = Client.create({
      id: 'idUser',
      name: 'name',
    });

    if (client.isLeft() || client2.isLeft()) {
      throw Error('client invalid');
    }

    expect(client.value).toBeInstanceOf(Client);
    expect(client.value.id).toEqual('idUser');
    expect(client.value.name).toContain('name');
    expect(client.value.userId).toEqual('userId');
    expect(client2.value.userId).toEqual('');

    client.value.name = 'name2';
    expect(client.value.name).toContain('name2');
  });

  it('Should be a not create Client isLeft', () => {
    const client = Client.create({
      id: '',
      name: 'name',
    });

    if (client.isRight()) {
      throw Error('client valid');
    }

    expect(client.value.message).toEqual('CoreError > The Client Dont create is invalid');
    expect(client.value).toBeInstanceOf(ClientDontCreate);
  });
})