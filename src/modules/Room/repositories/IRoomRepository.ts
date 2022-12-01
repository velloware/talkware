import { Room } from '../Domain/Room';

export interface IRoomRepository {
  exists(id: string): Promise<boolean>;
  findRoomById(RoomId: string): Promise<Room | null>;
  findRoomByOwnerId(userId: string): Promise<Room[] | Room | null>;
  save(room: Room): Promise<void>;
  create(room: Room): Promise<void>;
}
