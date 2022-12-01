import { User } from '../Domain/User';

export interface IUsersRepository {
  exists(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
  create(user: User): Promise<void>;
}
