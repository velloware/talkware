import { Client } from '../../../modules/Client/Domain/Client';
import { Message } from '../../../modules/Message/Domain/Message';

export interface IRoom {
  id: string;
  name: string;
  messages: Message[];
  clients: Client[];
  isPrivate: boolean;
  password: string;
  ownerId: string;
}

export interface ICreateRoom {
  id?: string;
  name: string;
  messages: Message[];
  clients: Client[];
  isPrivate: boolean;
  password: string;
  ownerId: string;
}

export interface IRoomClass {
  addMessage(message: Message): void;
  addClient(client: Client): void;
  removeClient(clientId: string): void;
  removeMessage(messageId: string): void;
  getMessages(): Message[];
  getClients(): Client[];
  getOwnerId(): string;
}

export interface Emitter {
  (event: string, data: any): void;
}
