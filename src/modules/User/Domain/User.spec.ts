import { User } from './User';
import { Email } from './Email';
import { Password } from './Password';

const email = Email.create('gabreilbarros13@gmail.com');
const password = Password.create('84656505');

describe('Test User (Password, Email)', () => {
  it('should be a create user isRight', () => {
    if (email.isLeft()) {
      throw Error('Email invalid');
    }

    if (password.isLeft()) {
      throw Error('Password invalid');
    }

    const user = User.create({
      email: email.value,
      password: password.value,
      username: 'Gabriel',
    });

    if (user.isLeft()) {
      throw Error('User don`t create');
    }

    expect(user.value).toBeInstanceOf(User);
    expect(user.value.email).toEqual('gabreilbarros13@gmail.com');
    expect(user.value.username).toEqual('Gabriel');
    expect(user.value.password).toEqual(password.value.value);
  });

  it('should be a create user with ID set in create isRight', () => {
    if (email.isLeft()) {
      throw Error('Email invalid');
    }

    if (password.isLeft()) {
      throw Error('Password invalid');
    }

    const user = User.create({
      email: email.value,
      password: password.value,
      username: 'Gabriel',
    }, 'uuidHere');

    if (user.isLeft()) {
      throw Error('User don`t create');
    }

    expect(user.value.id).toEqual('uuidHere');
    expect(user.value.user).toEqual({
      id: 'uuidHere',
      email: email.value.value,
      username: 'Gabriel',
    });
  });
});
