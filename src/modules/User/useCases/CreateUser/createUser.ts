import { uidCreate } from '../../../../shared/Utils/uid';
import { Either, left, right } from '../../../../core/logic/Either';
import { Email } from '../../Domain/Email';
import { InvalidEmailError } from '../../Domain/Errors/InvalidEmailError';
import { InvalidPasswordError } from '../../Domain/Errors/InvalidPasswordError';
import { Password } from '../../Domain/Password';
import { User } from '../../Domain/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AccountAlreadyExistsError } from './Errors/AccountAlreadyExistsError';

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
}

type CreateUserReturn = Either<InvalidEmailError | InvalidPasswordError, User>;

export class CreateUser {
  protected userRepository: IUsersRepository;

  constructor(UserRepository: IUsersRepository) {
    this.userRepository = UserRepository;
  }

  async create({
    email,
    password,
    username,
  }: ICreateUser): Promise<CreateUserReturn> {
    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value);
    }

    await passwordOrError.value.setHashPassword();

    const userOrError = User.create(
      {
        email: emailOrError.value,
        password: passwordOrError.value,
        username,
      },
      uidCreate(),
    );

    if (userOrError.isLeft()) {
      return left(userOrError.value);
    }

    const user = userOrError.value;

    const userAlredyExists = await this.userRepository.exists(user.email);

    if (userAlredyExists) {
      return left(new AccountAlreadyExistsError(user.email));
    }

    await this.userRepository.create(user);

    return right(user);
  }
}
