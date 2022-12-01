import { Either, left, right } from '../../../../core/logic/Either';
import { User } from '../../Domain/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { userDontExistError } from './Errors/userDontExist';

export interface IFindById {
  id: string;
}

type GetUserDatasReturn = Either<userDontExistError, User>;

export class FindUser {
  protected userRepository: IUsersRepository;

  constructor(UserRepository: IUsersRepository) {
    this.userRepository = UserRepository;
  }

  async findById({ id }: IFindById): Promise<GetUserDatasReturn> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return left(new userDontExistError(id));
    }

    return right(user);
  }
}
