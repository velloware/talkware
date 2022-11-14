import { uidCreate } from '../../../shared/Utils/uid';
import { Entity } from '../../../core/domain/Entity';
import { Either, left, right } from '../../../core/logic/Either';
import { InvalidEmailError } from './Errors/InvalidEmailError';
import { InvalidPasswordError } from './Errors/InvalidPasswordError';
import { InvalidUsernameError } from './Errors/InvalidUsernameError';
import { IUser, IUserView } from './IUser';

export class User extends Entity<IUser> {
  get id(): string {
    return this._id;
  }

  get username(): string {
    return this.props.username;
  }

  get email(): string {
    return this.props.email.value;
  }

  get password(): string {
    return this.props.password.value;
  }

  get user(): IUserView {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
    };
  }

  private constructor(UserProps: IUser, id?: string) {
    super(UserProps, id || uidCreate());
  }

  static create(
    UserProps: IUser,
    id?: string,
  ): Either<InvalidEmailError | InvalidPasswordError | InvalidUsernameError, User> {
    if (!UserProps.username) {
      return left(new InvalidUsernameError());
    }

    const user = new User(UserProps, id);

    return right(user);
  }
}
