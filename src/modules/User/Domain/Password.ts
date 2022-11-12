import { Either, left, right } from '../../../core/logic/Either';
import { comparePassword, hashedPassword } from '../../../shared/Utils/PassCrypt';
import { InvalidPasswordError } from './Errors/InvalidPasswordError';

export class Password {
  private password: string;
  private hashed?: boolean;

  get value() {
    return this.password;
  }

  public async setHashPassword() {
    this.password = await this.getHashedValue();
    this.hashed = true;
    return true;
  }

  private constructor(password: string, hashed: boolean) {
    this.password = password;
    this.hashed = hashed;
  }

  static validate(password: string): boolean {
    if (
      !password
      || password.trim().length < 6
      || password.trim().length > 255
    ) {
      return false;
    }

    return true;
  }

  public async getHashedValue(): Promise<string> {
    if (this.hashed) {
      return this.password;
    }

    return await hashedPassword(this.password);
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;

    if (this.hashed) {
      hashed = this.password;

      return await comparePassword(plainTextPassword, hashed);
    }

    return this.password === plainTextPassword;
  }

  static create(
    password: string,
    hashed = false,
  ): Either<InvalidPasswordError, Password> {
    if (!this.validate(password)) {
      return left(new InvalidPasswordError());
    }

    return right(new Password(password, hashed));
  }
}
