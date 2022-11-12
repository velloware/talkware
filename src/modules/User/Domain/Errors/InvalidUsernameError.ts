import { CoreError } from '../../../../shared/Error/CoreError';

export class InvalidUsernameError extends CoreError {
  constructor() {
    super('The username inserted is invalid.');
    this.name = 'InvalidUsernameError';
  }
}
