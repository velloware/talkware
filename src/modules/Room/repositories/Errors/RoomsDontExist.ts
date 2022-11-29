import { AppError } from '../../../../shared/Error/AppError';

export class roomDontExist extends AppError {
  constructor() {
    super('Invalid Datas for appointments');
    this.name = 'roomDontExist';
  }
}
