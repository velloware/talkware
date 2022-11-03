import { Either, left, right } from "../../../core/logic/Either";
import { Entity } from "../../../core/domain/Entity";
import { ClientDontCreate } from "./Errors/ClientDontCreate";
import { ClientClass, IClient } from "./IClient";

export class Client extends Entity<IClient> implements ClientClass {

  public socketId: string = "";

  private constructor(ClientProps: IClient) {
    super(ClientProps, ClientProps.userId);

    this.socketId = ClientProps.socketId || "";
  }

  public static create(ClientProps: IClient): Either<ClientDontCreate, Client> {
    const client = new Client(ClientProps);

    if (!client.userId) {
      return left(new ClientDontCreate());
    }

    return right(client);
  }

  get userId(): string {
    return this.props.userId || '';
  }

  get name(): string {
    return this.props.name;
  }

  set SocketId(socketId: string) {
    this.socketId = socketId;
  }

  set name(name: string) {
    this.props.name = name;
  }

}