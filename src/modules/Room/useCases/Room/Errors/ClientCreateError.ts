import { AppError } from '../../../../../shared/Error/AppError';

export class ClientCreateError extends AppError {
  constructor() {
    super(`This client dont create`);
    this.name = 'ClientCreateError';
  }
}
