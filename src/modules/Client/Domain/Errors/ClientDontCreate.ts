import { CoreError } from '../../../../shared/Error/CoreError';

export class ClientDontCreate extends CoreError {
  constructor() {
    super(`The Client Dont create is invalid`);
    this.name = 'ClientDontCreate';
  }
}
