import { IRoomClass, IRoom } from './IRoom';
import { Entity } from "../../../core/domain/Entity";

import { ClientClass } from '../../Client/Domain/IClient';
import { Message } from '../../Message/Domain/Message';
import { MessageClass } from '../../Message/Domain/IMessage';
import { Either, right } from '../../../core/logic/Either';

import { InvalidPropsError } from './Errors/InvalidPropsError';

export class Room extends Entity<IRoom> implements IRoomClass {

  private constructor(room: IRoom) {
    super(room, room.id);
  }

  public static create(room: IRoom): Either<InvalidPropsError, Room> {
    return right(new Room(room));
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