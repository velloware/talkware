import { AppError } from '../../../../../shared/Error/AppError';

export class UserIsLeft extends AppError {
  constructor(msg: string) {
    super(`User try auth with error: ${msg}`);
    this.name = 'UserIsLeft';
  }
}
