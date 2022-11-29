import { Either, left, right } from '../../../../core/logic/Either';
import { IRoomRepository } from '../../repositories/IRoomRepository';
import { Client } from '../../../Client/Domain/Client';
import {
  CreateClient,
  CreateClientReturn,
} from '../../../Client/useCases/CreateClient/CreateClient';
import {
  CreateMessage,
  ICreateMessage,
} from '../../../Message/useCases/CreateMessage/CreateMessage';
import { ClientCreateError } from './Errors/ClientCreateError';
import { UserDontFind } from './Errors/UserDontFind';
import { Room } from '../../Domain/Room';
import { RoomRepository } from '../../repositories/prisma/RoomRepository';

export interface clientConnectProps {
  idRoom: string;
  token: string;
  password?: string;
}

export type RoomManagerReturn = Either<
  ClientCreateError | UserDontFind,
  RoomManager
>;

export class RoomManager {
  protected roomRepository: IRoomRepository;
  private room: Room = {} as Room;
  private client: Client = {} as Client;

  private constructor(RoomRepository: IRoomRepository) {
    this.roomRepository = RoomRepository;
  }

  static async createRoomManager(
    idClient: string,
    clientConnectProps: clientConnectProps,
  ): Promise<RoomManagerReturn> {
    const roomManager = new RoomManager(new RoomRepository());

    const client = await roomManager.createAcessClient(
      idClient,
      clientConnectProps,
    );

    if (!client) {
      return left(new ClientCreateError());
    }

    const room = await roomManager.getRoom(
      clientConnectProps.idRoom,
      roomManager.roomRepository,
    );

    if (!room) {
      return left(new UserDontFind());
    }

    if (room.props.isPrivate) {
      if (
        !(
          clientConnectProps.token && clientConnectProps.token !== 'Anonymous'
        ) ||
        !clientConnectProps.password
      ) {
        return left(new UserDontFind());
      }
    }

    roomManager.room = room;
    roomManager.Client = client;

    return right(roomManager);
  }

  async createAcessClient(
    idClient: string,
    clientConnectProps: clientConnectProps,
  ): Promise<Client | false> {
    let client = {} as Client;
    if (
      !clientConnectProps ||
      !clientConnectProps?.token ||
      clientConnectProps.token === 'Anonymous'
    ) {
      const clientCreate = await RoomManager.createClient(idClient);

      if (clientCreate.isLeft()) {
        return false;
      }

      client = clientCreate.value;
    }

    return client;
  }

  static async createClient(
    id: string,
    name?: string,
  ): Promise<CreateClientReturn> {
    const clientCreate = await new CreateClient().create({
      id: id,
      name: name,
    });

    if (clientCreate.isLeft()) {
      return left(clientCreate.value);
    }

    return right(clientCreate.value);
  }

  public async getRoom(idRoom: string, RepositoryRoom: IRoomRepository) {
    const room = await RepositoryRoom.findRoomById(idRoom);

    if (!room) {
      return false;
    }

    return room;
  }

  public async changeRoom(idRoom: string) {
    const room = await this.getRoom(idRoom, this.roomRepository);

    if (!room) {
      return false;
    }

    this.room = room;
    return this.RoomId;
  }

  public async createMessage(createMessage: ICreateMessage) {
    const message = await new CreateMessage().create(createMessage);

    if (message.isLeft()) {
      return false;
    }

    this.Room.addMessage(message.value);

    return message.value;
  }

  set Client(client: Client) {
    this.client = client;
  }

  get Client() {
    return this.client;
  }

  get Room() {
    return this.room;
  }

  set Room(room: Room) {
    this.room = room;
  }

  get RoomId() {
    return this.room.props?.id || '';
  }
}
