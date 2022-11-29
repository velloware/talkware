import { Either, left, right } from '../../../../core/logic/Either';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { InvalidEmailOrPasswordError } from './Errors/InvalidEmailOrPasswordError';
import { JWT } from '../../Domain/jwt';

interface IAuthUserRequest {
  email: string;
  password: string;
}

export type IToken = {
  token: string;
};

type IAuthenticatorAuthUser = Either<InvalidEmailOrPasswordError, IToken>;

export class Authenticator {
  protected userRepository: IUsersRepository;

  constructor(UserRepository: IUsersRepository) {
    this.userRepository = UserRepository;
  }

  async authUser({
    email,
    password,
  }: IAuthUserRequest): Promise<IAuthenticatorAuthUser> {
    const userTryAuth = await this.userRepository.findByEmail(email);

    if (!userTryAuth) {
      return left(new InvalidEmailOrPasswordError());
    }

    if (await userTryAuth.props.password.comparePassword(password)) {
      return right(JWT.signUser(userTryAuth));
    }

    return left(new InvalidEmailOrPasswordError());
  }
}
