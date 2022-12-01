import { User } from '../../User/Domain/User';

export interface IClient {
  id: string;
  name: string;
  userId?: string;
  user?: User;
}

export interface ClientClass {
  get id(): string;
  get userId(): string;
  get name(): string;
  set name(name: string);
  get user(): User | undefined;
}
