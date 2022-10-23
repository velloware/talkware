import { IRoomClass, IRoom } from './IRoom';
import { Entity } from "../../../../core/domain/Entity";

import { Message } from '../../../Chat/Domain';
import { ClientClass } from '../../../Chat/Domain';
import { MessageClass } from '../../../Chat/Domain';

export class Room extends Entity<IRoom> implements IRoomClass {
  constructor(room: IRoom) {
    super(room, room.id);
  }

  addMessage(message: Message): void {
    this.props.messages.push(message);
  }

  addUser(user: ClientClass): void {
    this.props.users.push(user);
  }

  removeUser(userId: string): void {
    this.props.users = this.props.users.filter((user: ClientClass) => user.userId === userId);
  }

  removeMessage(messageId: string): void {
    this.props.messages = this.props.messages.filter((message: MessageClass) => {
      return message.id === messageId;
    });
  }

  getMessages(): MessageClass[] {
    return this.props.messages;
  }

  getUsers(): ClientClass[] {
    return this.props.users;
  }

  getOwnerId(): string {
    return this.props.ownerId;
  }
}