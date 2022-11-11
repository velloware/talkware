import { IRoomClass, IRoom } from './IRoom';
import { Entity } from "../../../core/domain/Entity";

import { Message } from '../../Message/Domain/Message';
import { Either, left, right } from '../../../core/logic/Either';

import { InvalidPropsError } from './Errors/InvalidPropsError';

import { uidCreate } from '../../../shared/Utils/uid';
import { Client } from '../../../modules/Client/Domain/Client';

export class Room extends Entity<IRoom> implements IRoomClass {

  private constructor(room: IRoom) {
    super(room, room.id || uidCreate());
  }

  public static create(room: IRoom): Either<InvalidPropsError, Room> {

    if (!room.name) {
      return left(new InvalidPropsError('Room name is required'));
    }

    return right(new Room(room));
  }

  addMessage(message: Message): void {
    this.props.messages.push(message);
  }

  addClient(client: Client): void {
    this.props.clients.push(client);
  }

  getMessages(): Message[] {
    return this.props.messages;
  }

  getClients(): Client[] {
    return this.props.clients;
  }

  getOwnerId(): string {
    return this.props.ownerId;
  }

  removeClient(clientId: string): void {
    this.props.clients = this.props.clients.filter((client: Client) => client.id !== clientId);
  }

  removeMessage(messageId: string): void {
    this.props.messages = this.props.messages.filter((message: Message) => message.id !== messageId);
  }
}