import { ClientClass } from '../../Client/Domain/IClient';
import { MessageClass } from '../../Message/Domain/IMessage';

export interface IRoom {
  id: string;
  name: string;
  messages: MessageClass[];
  users: ClientClass[];
  isPrivate: boolean;
  password: string;
  ownerId: string;
}

export interface IRoomClass {
  addMessage(message: MessageClass): void;
  addUser(user: ClientClass): void;
  removeUser(userId: string): void;
  removeMessage(messageId: string): void;
  getMessages(): MessageClass[];
  getUsers(): ClientClass[];
  getOwnerId(): string;
}

export interface Emitter {
  (event: string, data: any): void;
}