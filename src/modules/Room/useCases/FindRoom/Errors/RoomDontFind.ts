import { AppError } from '../../../../../shared/Error/AppError';

export class RoomDontFind extends AppError {
  constructor() {
    super(`This Room Dont find`);
    this.name = 'RoomDontFind';
  }
}
