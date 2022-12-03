import { AppError } from '../../../../../shared/Error/AppError';

export class JoinRoomError extends AppError {
  constructor() {
    super(
      `Error in join room, verify if exist or your acess or password is correct`,
    );
    this.name = 'JoinRoomError';
  }
}
