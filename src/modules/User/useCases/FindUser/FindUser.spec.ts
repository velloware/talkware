import { FindUser } from './FindUser';
import { InMemoryUsersRepository } from '../../repositories/InMemory/UsersRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';

import { CreateUser } from '../CreateUser/createUser';
import { User } from '../../Domain/User';

let usersRepository: IUsersRepository;
let findUser: FindUser;
let createUser: CreateUser;

describe('Find User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    findUser = new FindUser(usersRepository);
    createUser = new CreateUser(usersRepository);
  });

  it('should be able to find a user', async () => {
    const newUser = await createUser.create({
      email: 'gabrielbarros13@gmail.com',
      password: '1515mOKC',
      username: 'ColgAate13xx',
    });

    if (newUser.isLeft()) {
      throw new Error('User not created');
    }

    const user = await findUser.findById({
      id: newUser.value.id,
    });

    expect(user.isRight()).toBe(true);
    expect(user.value).toBeInstanceOf(User);
  });
});
