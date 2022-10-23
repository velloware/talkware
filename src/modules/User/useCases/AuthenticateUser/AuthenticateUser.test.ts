import { Authenticator } from './AuthenticateUser';
import { InMemoryUsersRepository } from '../../repositories/InMemory/UsersRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUser } from '../CreateUser/createUser';
import { InvalidEmailOrPasswordError } from './Errors/InvalidEmailOrPasswordError';

let usersRepository: IUsersRepository;
let authenticator: Authenticator;
let createUser: CreateUser;

describe('Test Authenticator UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticator = new Authenticator(usersRepository);
    createUser = new CreateUser(usersRepository);
  });

  it('should be a auth User isRight', async () => {
    await createUser.create({
      email: 'gabrielbarros13@gmail.com',
      password: '1515mOKC',
      username: 'ColgAate13xx',
    });

    const user = await authenticator.authUser({
      email: 'gabrielbarros13@gmail.com',
      password: '1515mOKC',
    });

    if (user.isLeft()) {
      throw new Error('User dont auth');
    }

    expect(user.value.token).toEqual(expect.any(String));
    expect(user.isRight()).toEqual(true);
  });

  it('should be a dont auth User isLeft Password Invalid', async () => {
    await createUser.create({
      email: 'gabrielbarros13@gmail.com',
      password: '1515mOKC',
      username: 'ColgAate13xx',
    });

    const user = await authenticator.authUser({
      email: 'gabrielbarros13@gmail.com',
      password: '1515mOKCd',
    });

    expect(user.isRight()).toEqual(false);
    expect(user.value).toBeInstanceOf(InvalidEmailOrPasswordError);
  });

  it('should be a dont auth User isLeft User Dont Find', async () => {
    await createUser.create({
      email: 'gabrielbarros13@gmail.com',
      password: '1515mOKC',
      username: 'ColgAate13xx',
    });

    const user = await authenticator.authUser({
      email: 'gabrielbarros@gmail.com',
      password: '1515mOKC',
    });

    expect(user.isRight()).toEqual(false);
    expect(user.value).toBeInstanceOf(InvalidEmailOrPasswordError);
  });
});
