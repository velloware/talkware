import { Entity } from "../../../../core/domain/Entity";
import { MessageClass, IMessage } from "./IMessage";

export class Message extends Entity<IMessage> implements MessageClass {

  constructor(MessageProps: IMessage) {
    super(MessageProps, MessageProps.id);
  }

  get id(): string {
    return this.props.id;
  }

  get data(): string | Buffer {
    return this.props.data;
  }

  get roomId(): string | Buffer {
    return this.props.roomId;
  }

  get userId(): string | Buffer {
    return this.props.userId;
  }
}