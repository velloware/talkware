import { ClientClass } from '../Client/IClient';
import { MessageClass } from '../Message/IMessage';

export interface IRoom {
  id: string;
  users: ClientClass[];
  messages: MessageClass[];
  name: string;
  password: string;
  isPrivate: boolean;
  ownerId: string;
}

export interface IRoomClass {
  addMessage(message: MessageClass): void;
  addUser(user: ClientClass): void;
  removeUser(user: ClientClass): void;
  removeMessage(message: MessageClass): void;
  getMessages(): MessageClass[];
  getUsers(): ClientClass[];
  getOwnerId(): string;
}