import { AppError } from '../../../../../shared/Error/AppError';

export class userDontExistError extends AppError {
  constructor(id: string) {
    super(`Dont exist user with id ${id}`);
    this.name = 'userDontExistError';
  }
}
