import { Room } from '../Domain/Room';

export interface IUsersRepository {
  exists(id: string): Promise<boolean>
  findById(id: string): Promise<Room | null>
  save(user: Room): Promise<void>
  create(user: Room): Promise<void>
}