import { Either, left, right } from "../../../../core/logic/Either";
import { IRoomRepository } from "modules/Room/repositories/IRoomRepository";
import { Client, Message } from '../../../Chat/Domain';
import { ClientCreateError } from "./Errors/ClientCreateError";
import { UserDontFind } from "./Errors/UserDontFind";
import { Room } from '../../Domain/Room';

interface TokenUser {
  token: string;
}

type RoomCreateClient = Either<ClientCreateError | UserDontFind, Client>;

export class RoomManager {
  protected roomRepository: IRoomRepository;
  private Room: Room = {} as Room;
  private client: Client = {} as Client;

  constructor(RoomRepository: IRoomRepository) {
    this.roomRepository = RoomRepository;
  }

  public createClient(idSocketClient: string, tokenUserProps: any | TokenUser): RoomCreateClient {
    const tokenUser = JSON.parse(JSON.stringify(tokenUserProps));

    if (!(tokenUser?.token) || (tokenUser.token === "Anonymous")) {
      const client = new Client({
        userId: "Anonymous",
        socketId: idSocketClient,
        name: `Anonymous-${new Date().getTime()}`,
      });

      if (!client) {
        return left(new ClientCreateError());
      }

      this.client = client;
      return right(client);

    } else {

      tokenUser as TokenUser;

      const findUserByTonken = {
        token: tokenUser.token,
        name: "Carlos",
        userId: "123456789",
      }

      if (!findUserByTonken) {
        return left(new UserDontFind());
      }

      const client = new Client({
        userId: findUserByTonken.userId,
        name: findUserByTonken.name,
        socketId: idSocketClient,
      });

      if (!client) {
        return left(new ClientCreateError());
      }

      this.client = client;
      return right(client);
    }
  }

  public getClientSocketId(): string {
    return this.client.socketId;
  }

}
