import { AppError } from '../../../../../shared/Error/AppError';

export class InvalidEmailOrPasswordError extends AppError {
  constructor() {
    super(`Invalid e-mail/password combination.`);
    this.name = 'InvalidEmailOrPasswordError';
  }
}
