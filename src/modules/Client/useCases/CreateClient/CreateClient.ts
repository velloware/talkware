import { Either, left, right } from '../../../../core/logic/Either';
import { Client } from '../../Domain/Client';
import { ClientDontCreate } from '../../Domain/Errors/ClientDontCreate';

interface ICreateClient {
  id: string;
  name: string;
}

type CreateClientReturn = Either<ClientDontCreate, Client>;

export class CreateClient {

  constructor() { }

  async create({ id, name }: ICreateClient): Promise<CreateClientReturn> {
    const client = Client.create({ id, name });

    if (client.isLeft()) {
      return left(client.value);
    }

    return right(client.value);
  }

}