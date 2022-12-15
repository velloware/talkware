import { CreateINewConnection, NewConnection } from './NewConnection';

describe('NewConnection', () => {
  const createINewConnection: CreateINewConnection = {
    data: {
      anonymous: true,
    },
    id: '123',
  };

  it('should be able to create a new connection', async () => {
    const newConnection = new NewConnection(createINewConnection);
    const connection = await newConnection.execute();

    expect(connection.isRight()).toBe(true);
  });
});
