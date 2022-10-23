import { AppError } from '../../../../../shared/Error/AppError';

export class AccountAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(`Alredy exist Accont with this email ${email}`);
    this.name = 'AccountAlreadyExistsError';
  }
}
