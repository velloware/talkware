import { Either, left, right } from "../../../../core/logic/Either";
import { IRoomRepository } from "../../repositories/IRoomRepository";
import { Client } from '../../../Client/Domain/Client';
import { CreateClient, CreateClientReturn } from '../../../Client/useCases/CreateClient/CreateClient';
import { Message } from '../../../Message/Domain/Message';
import { ClientCreateError } from "./Errors/ClientCreateError";
import { UserDontFind } from "./Errors/UserDontFind";
import { Room } from '../../Domain/Room';
import { RoomRepository } from '../../repositories/prisma/RoomRepository';

export interface typeClientToken {
  token: string;
}

export type RoomManagerReturn = Either<ClientCreateError | UserDontFind, RoomManager>;

export class RoomManager {
  protected roomRepository: IRoomRepository;
  private room: Room = {} as Room;
  private client: Client = {} as Client;

  private constructor(RoomRepository: IRoomRepository) {
    this.roomRepository = RoomRepository;
  }

  static async createRoomManager(IdRoom: string, idClient: string, typeClientToken: typeClientToken): Promise<RoomManagerReturn> {

    const roomManager = new RoomManager(new RoomRepository());

    const client = await roomManager.createAcessClient(idClient, typeClientToken);

    if (!client) {
      return left(new ClientCreateError());
    }

    const room = await roomManager.getRoom(IdRoom, roomManager.roomRepository);

    if (!room) {
      return left(new UserDontFind());
    }

    roomManager.room = room;
    roomManager.Client = client;

    return right(roomManager);
  }

  async createAcessClient(idClient: string, typeClientToken: typeClientToken): Promise<Client | false> {

    let client = {} as Client;
    if (!(typeClientToken) || !(typeClientToken?.token) || (typeClientToken.token === "Anonymous")) {
      const clientCreate = await RoomManager.createClient(idClient, "Anonymous");

      if (clientCreate.isLeft()) {
        return false;
      }

      client = clientCreate.value;
    }

    return client;
  }

  static async createClient(id: string, name = `Anonymous-${new Date().getMilliseconds()}`): Promise<CreateClientReturn> {
    const clientCreate = await new CreateClient().create({ id: id, name: name });

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

  set Client(client: Client) {
    this.client = client;
  }

  get Client() {
    return this.client;
  }

  get Room() {
    return this.Room;
  }

  set Room(room: Room) {
    this.Room = room;
  }

  get RoomId() {
    return this.room.props?.id || '';
  }
}