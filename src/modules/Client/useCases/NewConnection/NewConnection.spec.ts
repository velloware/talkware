import { InMemoryRoomRepository } from '../../../Room/repositories/InMemory/RoomRepository';
import { InMemoryUsersRepository } from '../../../User/repositories/InMemory/UsersRepository';
import { CreateINewConnection, NewConnection } from './NewConnection';

import { CreateClient } from '../../../Client/useCases/CreateClient/CreateClient';

let RoomRepository: InMemoryRoomRepository;
let prismaUsersRepository: InMemoryUsersRepository;

describe('NewConnection', () => {
  beforeEach(() => {
    RoomRepository = new InMemoryRoomRepository();
    prismaUsersRepository = new InMemoryUsersRepository();
  });

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

  it('should not be able to create a new connection with invalid data', async () => {
    const newConnection = new NewConnection(
      {
        ...createINewConnection,
        data: {
          ...createINewConnection.data,
          anonymous: false,
        },
      },
      prismaUsersRepository,
      RoomRepository,
    );

    const connection = await newConnection.execute();

    expect(connection.isLeft()).toBe(true);
  });

  it('should be able to create a new connection using Client dont anonymous', async () => {
    const client = await new CreateClient().create({
      id: '123',
      name: '123',
    });

    if (client.isLeft()) throw new Error('Client not created');

    const createINewConnectionUser: CreateINewConnection = {
      data: {
        anonymous: false,
        client: client.value,
        userId: '123',
      },
      id: '123',
    };
    const newConnection = new NewConnection(
      {
        ...createINewConnectionUser,
      },
      prismaUsersRepository,
      RoomRepository,
    );

    const connection = await newConnection.execute();

    expect(connection.isLeft()).toBe(true);
  });
});
