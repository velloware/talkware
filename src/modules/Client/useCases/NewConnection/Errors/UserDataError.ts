import { AppError } from '../../../../../shared/Error/AppError';

export class UserDataError extends AppError {
  constructor(msg: string) {
    super(`UserId or UserProps with error: ${msg}`);
    this.name = 'UserDataError';
  }
}
