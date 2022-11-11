import { Either, left, right } from "../../../core/logic/Either";
import { Entity } from "../../../core/domain/Entity";
import { MessageDontCreate } from "./Errors/MessageDontCreate";
import { MessageClass, IMessage } from "./IMessage";

export class Message extends Entity<IMessage> implements MessageClass {

  private constructor(MessageProps: IMessage) {
    super(MessageProps, MessageProps.id);
  }

  static create(MessageProps: IMessage): Either<MessageDontCreate, Message> {

    if (!MessageProps.clientId || !MessageProps.roomId || !MessageProps.data) {
      return left(new MessageDontCreate());
    }

    const message = new Message(MessageProps);

    if (!message.id) {
      return left(new MessageDontCreate());
    }

    return right(message);
  }

  get id(): string {
    return this.props.id;
  }

  get data(): string | Buffer {
    return this.props.data;
  }

  get clientId(): string {
    return this.props.clientId;
  }

  get roomId(): string {
    return this.props.roomId;
  }

  get userId(): string {
    return this.props.userId || '';
  }
}