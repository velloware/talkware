import { CoreError } from '../../../../shared/Error/CoreError';

export class InvalidEmailError extends CoreError {
  constructor(emailInvalid: string) {
    super(`The Email(${emailInvalid}) is invalid`);
    this.name = 'InvalidEmailError';
  }
}
