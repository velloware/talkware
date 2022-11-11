import { AppError } from '../../../../../shared/Error/AppError';

export class UserDontFind extends AppError {
  constructor() {
    super(`This user Dont find`);
    this.name = 'UserDontFind';
  }
}
