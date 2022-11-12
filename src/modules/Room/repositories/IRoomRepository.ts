import { Room } from '../Domain/Room';
import { roomDontExist } from './Errors/RoomsDontExist';
import { Either, left, right } from '../../../core/logic/Either';

export interface IRoomRepository {
  exists(id: string): Promise<boolean>
  findRoomById(RoomId: string): Promise<Room | null>
  save(room: Room): Promise<void>
  create(room: Room): void
}