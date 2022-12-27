import { Email } from '../../Domain/Email';
import { Password } from '../../Domain/Password';
import { Either, left } from '../../../../core/logic/Either';
import { User } from '../../Domain/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { userDontExistError } from '../Errors/userDontExist';

export interface IEditUser {
  id: string;
  email?: string;
  username?: string;
  password?: string;
}

export type editUserReturns = Either<userDontExistError, User>;

export class EditUser {
  protected userRepository: IUsersRepository;

  constructor(userRepository: IUsersRepository) {
    this.userRepository = userRepository;
  }

  async edit(userId: string, EditUser: IEditUser): Promise<editUserReturns> {
    if (!userId || !EditUser) {
      return left(
        new userDontExistError(
          'Your request Body is invalid or User Dont exist',
        ),
      );
    }

    const userToEdit = await this.userRepository.findById(userId);

    if (!userToEdit) {
      return left(new userDontExistError(userId));
    }

    const email = Email.create(EditUser.email || userToEdit.email);
    const password = Password.create(EditUser.password || userToEdit.password);

    if (email.isLeft()) {
      return left(new userDontExistError(userId));
    }

    if (password.isLeft()) {
      return left(new userDontExistError(userId));
    }

    const user = User.create(
      {
        username: EditUser.username || userToEdit.username,
        email: email.value,
        password: password.value,
      },
      userId,
    );

    if (user.isLeft()) {
      throw user.value;
    }

    await this.userRepository.save(user.value);

    return user;
  }
}
