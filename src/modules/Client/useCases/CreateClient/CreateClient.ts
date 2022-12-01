import { User } from '../../../User/Domain/User';
import { Either, left, right } from '../../../../core/logic/Either';
import { Client } from '../../Domain/Client';
import { ClientDontCreate } from '../../Domain/Errors/ClientDontCreate';

interface ICreateClient {
  id: string;
  name?: string;
  user?: User;
}

export type CreateClientReturn = Either<ClientDontCreate, Client>;

export class CreateClient {
  constructor() {
    //  ...
  }

  async create({ id, name, user }: ICreateClient): Promise<CreateClientReturn> {
    let nameToCreate = '';

    if (!name) {
      nameToCreate = `Anonymous`;
    }

    const client = Client.create({ id, name: nameToCreate, user });

    if (client.isLeft()) {
      return left(client.value);
    }

    return right(client.value);
  }
}
