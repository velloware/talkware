import { Either, left, right } from '../../../../core/logic/Either';
import { IRoomRepository } from '../../repositories/IRoomRepository';
import { Client } from '../../../Client/Domain/Client';
import {
  CreateMessage,
  ICreateMessage,
} from '../../../Message/useCases/CreateMessage/CreateMessage';
import { ClientCreateError } from './Errors/ClientCreateError';
import { UserDontFind } from './Errors/UserDontFind';
import { Room } from '../../Domain/Room';
import { RoomRepository } from '../../repositories/prisma/RoomRepository';

export interface clientConnectRoomProps {
  idRoom: string;
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

  private constructor(RoomRepository: IRoomRepository, Client: Client) {
    this.roomRepository = RoomRepository;
    this.client = Client;
  }

  static async createRoomManager(
    Client: Client,
    clientConnectRoomProps: clientConnectRoomProps,
  ): Promise<RoomManagerReturn> {
    if (!Client || !clientConnectRoomProps) {
      return left(new ClientCreateError());
    }

    const roomManager = new RoomManager(new RoomRepository(), Client);

    const room = await roomManager.getRoom(
      clientConnectRoomProps.idRoom,
      roomManager.roomRepository,
    );

    if (!room) {
      return left(new UserDontFind());
    }

    roomManager.room = room;
    roomManager.Client = Client;

    return right(roomManager);
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
