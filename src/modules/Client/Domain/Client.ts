import { Either, left, right } from "../../../core/logic/Either";
import { Entity } from "../../../core/domain/Entity";
import { ClientDontCreate } from "./Errors/ClientDontCreate";
import { ClientClass, IClient } from "./IClient";

export class Client extends Entity<IClient> implements ClientClass {

  private constructor(ClientProps: IClient) {
    super(ClientProps, ClientProps.id);
  }

  public static create(ClientProps: IClient): Either<ClientDontCreate, Client> {
    const client = new Client(ClientProps);

    if (!client.id) {
      return left(new ClientDontCreate());
    }

    return right(client);
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId || '';
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

}