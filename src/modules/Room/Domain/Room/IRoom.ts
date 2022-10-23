import { ClientClass } from '../../../Chat/Domain';
import { MessageClass } from '../../../Chat/Domain';

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
  removeUser(userId: string): void;
  removeMessage(messageId: string): void;
  getMessages(): MessageClass[];
  getUsers(): ClientClass[];
  getOwnerId(): string;
}