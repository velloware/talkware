import { Message } from '../../Domain/Message';
import { MessageDontCreate } from '../../Domain/Errors/MessageDontCreate';
import { Either, left, right } from '../../../../core/logic/Either';

interface ICreateMessage {
  id: string;
  data: string | Buffer;
  clientId: string;
  roomId: string;
  userId?: string;
}

type CreateMessageReturn = Either<MessageDontCreate, Message>;

export class CreateMessage {

  constructor() { }

  async create({ id, data, clientId, roomId, userId }: ICreateMessage): Promise<CreateMessageReturn> {
    const message = Message.create({ id, data, clientId, roomId, userId });

    if (message.isLeft()) {
      return left(message.value);
    }

    return right(message.value);
  }

}