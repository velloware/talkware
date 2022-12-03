import { Either, left, right } from '../../../core/logic/Either';
import { Entity } from '../../../core/domain/Entity';
import { ClientDontCreate } from './Errors/ClientDontCreate';
import { ClientClass, IClient } from './IClient';
import { createHash } from '../../../shared/Utils/lowHash';
import { User } from '../../User/Domain/User';

export class Client extends Entity<IClient> implements ClientClass {
  private saltClient: string;

  private constructor(ClientProps: IClient) {
    super(ClientProps, ClientProps.id);
    this.saltClient =
      createHash(`${new Date().getMilliseconds()}`) +
      this.id[0] +
      this.id[1] +
      this.id[2];
  }

  public static create(ClientProps: IClient): Either<ClientDontCreate, Client> {
    const client = new Client(ClientProps);

    if (!client.id) {
      return left(new ClientDontCreate());
    }

    client.name = ClientProps.name;

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
    this.props.name = `${name}-${this.saltClient}`;
  }

  set setUserId(userId: string) {
    this.props.userId = userId;
  }

  get user(): User | undefined {
    return this.props.user;
  }
}
