import { CoreError } from '../../../../shared/Error/CoreError';

export class InvalidPropsError extends CoreError {
  constructor(emailInvalid: string) {
    super(`The Props is invalid`);
    this.name = 'InvalidPropsError';
  }
}
