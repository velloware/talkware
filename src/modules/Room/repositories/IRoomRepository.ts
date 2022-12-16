import { Either } from '../../../core/logic/Either';
import { Room } from '../Domain/Room';
import { roomDontExist } from './Errors/RoomsDontExist';

export interface IRoomRepository {
  exists(id: string): Promise<boolean>;
  list(): Promise<Either<roomDontExist, Room[] | Room>>;
  findRoomById(RoomId: string): Promise<Room | null>;
  findRoomByOwnerId(userId: string): Promise<Room[] | Room | null>;
  save(room: Room): Promise<void>;
  create(room: Room): Promise<void>;
}
