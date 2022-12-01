import { AppError } from '../../../../../shared/Error/AppError';

export class DontCreateAnonymousClient extends AppError {
  constructor(msg: string) {
    super(`dont create anonymous client: ${msg}`);
    this.name = 'DontCreateAnonymousClient';
  }
}
