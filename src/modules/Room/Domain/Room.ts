import { IRoomClass, IRoom, ICreateRoom } from './IRoom';
import { Entity } from '../../../core/domain/Entity';

import { Message } from '../../Message/Domain/Message';
import { Either, left, right } from '../../../core/logic/Either';

import { InvalidPropsError } from './Errors/InvalidPropsError';

import { uidCreate } from '../../../shared/Utils/uid';
import { comparePassword } from '../../../shared/Utils/PassCrypt';
import { Client } from '../../../modules/Client/Domain/Client';

export type createRoomReturns = Either<InvalidPropsError, Room>;

export class Room extends Entity<IRoom> implements IRoomClass {
  private constructor(room: IRoom) {
    super(room, room.id || uidCreate());
  }

  public static create(room: ICreateRoom): createRoomReturns {
    if (!room.name) {
      return left(new InvalidPropsError('Room name is required'));
    }

    if (room.isPrivate && !room.password) {
      return left(new InvalidPropsError('Room password is required'));
    }

    const id = room.id || uidCreate();

    const roomClass = new Room({
      ...room,
      id,
    });
    roomClass.props.id = roomClass.props.id ? roomClass.props.id : id;

    return right(roomClass);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get ownerId(): string {
    return this.props.ownerId;
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
    this.props.clients = this.props.clients.filter(
      (client: Client) => client.id !== clientId,
    );
  }

  removeMessage(messageId: string): void {
    this.props.messages = this.props.messages.filter(
      (message: Message) => message.id !== messageId,
    );
  }

  get isPrivate(): boolean {
    return this.props.isPrivate;
  }

  async comparePassword(password: string): Promise<boolean> {
    return await comparePassword(this.props.password, password);
  }
}
