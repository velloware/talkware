import { IRoomClass, IRoom } from './IRoom';
import { Entity } from "../../../core/domain/Entity";

import { Message } from '../Message/Message';
import { ClientClass } from '../Client/IClient';
import { MessageClass } from '../Message/IMessage';

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

  removeUser(userProps: any): void {
    this.props.users = this.props.users.filter((user: ClientClass) => user.id === userProps.id);
  }

  removeMessage(messageProps: any): void {
    this.props.messages = this.props.messages.filter((message: MessageClass) => {
      return message.id === messageProps.id;
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