import { CoreError } from '../../../../shared/Error/CoreError';

export class MessageDontCreate extends CoreError {
  constructor() {
    super(`The Message Dont create is invalid`);
    this.name = 'MessageDontCreate';
  }
}
