import { Client } from '../../Domain/Client';
import { Either, left, right } from '../../../../core/logic/Either';
import { CreateClient, CreateClientReturn } from '../CreateClient/CreateClient';
import { FindUser } from '../../../User/useCases/FindUser/FindUser';
import { FindRoom } from '../../../Room/useCases/FindRoom/FindRoom';

import { PrismaUsersRepository } from '../../../User/repositories/prisma/UsersRepository';
import { RoomRepository } from '../../../Room/repositories/prisma/RoomRepository';

import { DontCreateAnonymousClient } from './Errors/DontCreateAnonymousClient';
import { UserDataError } from './Errors/UserDataError';
import { UserIsLeft } from './Errors/UserIsLeft';
import { Room } from '../../../Room/Domain/Room';

export interface CreateINewConnection {
  data: SocketDataClient;
  id: string;
}

export interface SocketDataClient {
  userId?: string;
  client?: Client;
  anonymous?: boolean;
}

export interface INewConnectionrReturn {
  client: Client;
  RoomsHasAcess?: Room[];
  RoomsCreated?: Room[];
  alerts?: string[];
}

type INewConnectionAllReturn = Either<
  DontCreateAnonymousClient | UserDataError,
  INewConnectionrReturn
>;

export class NewConnection {
  private newConnectionProps: CreateINewConnection;
  private createClient = new CreateClient();
  protected prismaUsersRepository: PrismaUsersRepository;
  protected roomRepository: RoomRepository;
  constructor(
    newConnectionProps: CreateINewConnection,
    prismaUsersRepository?: PrismaUsersRepository,
    roomRepository?: RoomRepository,
  ) {
    this.prismaUsersRepository =
      prismaUsersRepository || new PrismaUsersRepository();
    this.roomRepository = roomRepository || new RoomRepository();
    this.newConnectionProps = newConnectionProps;
  }

  public async execute(): Promise<INewConnectionAllReturn> {
    let client: CreateClientReturn;
    const alerts: string[] = [];
    const RoomsCreated: Room[] = [];
    const RoomsHasAcess: Room[] = [];

    const DataClient: SocketDataClient = this.newConnectionProps.data;
    if (DataClient.anonymous) {
      client = await this.createClient.create({
        id: this.newConnectionProps.id,
      });

      if (client.isLeft()) {
        return left(new DontCreateAnonymousClient(client.value.message));
      }
    } else {
      const findUser = new FindUser(this.prismaUsersRepository);
      const findRoom = new FindRoom(this.roomRepository);

      if (!DataClient.userId && typeof DataClient.userId !== 'string') {
        return left(new UserDataError('userId is not a string'));
      }

      const getUser = await findUser.findById({
        id: DataClient.userId,
      });

      if (getUser.isLeft()) {
        return left(new UserIsLeft(getUser.value.message));
      }

      client = await this.createClient.create({
        id: this.newConnectionProps.id,
        name: getUser.value.username,
        user: getUser.value,
      });

      if (client.isLeft()) {
        return left(new UserIsLeft(client.value.message));
      }

      client.value.setUserId = DataClient.userId;

      const getRooms = await findRoom.findRoomByOwnerId(DataClient.userId);

      if (getRooms.isLeft()) {
        alerts.push(getRooms.value.message);
      }

      if (getRooms.isRight()) {
        if (Array.isArray(getRooms.value)) {
          RoomsCreated.push(...getRooms.value);
        } else {
          RoomsCreated.push(getRooms.value);
        }
      }
    }

    if (client.isLeft()) {
      return left(new UserIsLeft(client.value.message));
    }

    return right({
      client: client.value,
      RoomsHasAcess,
      RoomsCreated,
      alerts,
    });
  }
}
