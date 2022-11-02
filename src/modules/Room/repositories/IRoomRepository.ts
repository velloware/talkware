import { Room } from '../Domain/Room';
import { roomDontExist } from './Errors/RoomsDontExist';
import { Either, left, right } from '../../../core/logic/Either';

type RoomServiceReturn = Either<roomDontExist, Room>;

export interface IRoomRepository {
  exists(id: string): Promise<boolean>
  findRoomById(RoomId: string): Promise<RoomServiceReturn>
  save(room: Room): Promise<void>
  create(room: Room): void
}