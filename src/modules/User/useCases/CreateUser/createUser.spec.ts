import { CreateUser } from './createUser';
import { InMemoryUsersRepository } from '../../repositories/InMemory/UsersRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { User } from '../../Domain/User';

let usersRepository: IUsersRepository;
let createUser: CreateUser;

describe('Test CreateUser UseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUser = new CreateUser(usersRepository);
  });

  it('should be a create User isRight', async () => {
    const user = await createUser.create({
      email: 'gabrielbarros13@gmail.com',
      password: '1515mOKC',
      username: 'ColgAate13xx',
    });

    if (user.isLeft()) {
      throw new Error('User dont create');
    }

    expect(user.value).toBeInstanceOf(User);
    expect(user.value.email).toEqual('gabrielbarros13@gmail.com');
    expect(user.value.password).toContain('$2b');
  });

  it('should be a not create User isRight - Exsit User', async () => {
    await createUser.create({
      email: 'gabrielbarros13@gmail.com',
      password: '8798777',
      username: 'ColgAate13xx',
    });

    const user = await createUser.create({
      email: 'gabrielbarros13@gmail.com',
      password: '123145141',
      username: 'ColgAaaatu',
    });

    if (user.isRight()) {
      throw new Error('User created');
    }

    expect(user.isLeft()).toBeTruthy();
  });

  it('should be a not create User isRight - Email invalid', async () => {
    const user = await createUser.create({
      email: 'gabrielbarros13@',
      password: '1515mOKC',
      username: 'ColgAate13xx',
    });

    if (user.isRight()) {
      throw new Error('User created');
    }

    expect(user.isLeft()).toBeTruthy();
  });

  it('should be a not create User isRight - Password invalid', async () => {
    const user = await createUser.create({
      email: 'gabrielbarros13@gmail.com',
      password: '1',
      username: 'ColgAate13xx',
    });

    if (user.isRight()) {
      throw new Error('User created');
    }

    expect(user.isLeft()).toBeTruthy();
  });

  it('should be a not create User isRight - Username invalid', async () => {
    const user = await createUser.create({
      email: 'gabrielbarros13@gmail.com',
      password: '123456789',
      username: '',
    });

    if (user.isRight()) {
      throw new Error('User created');
    }

    expect(user.isLeft()).toBeTruthy();
  });
});
