import { hashedPassword } from '../../../../shared/Utils/PassCrypt';
import { Room } from '../../Domain/Room';
import { IRoomRepository } from '../IRoomRepository';

export class InMemoryRoomRepository implements IRoomRepository {
  constructor(public items: Room[] = []) {
    //
  }

  async exists(id: string): Promise<boolean> {
    return this.items.some(room => room.id === id);
  }

  async findRoomByOwnerId(userId: string): Promise<Room> {
    const room = this.items.filter(user => {
      return user.ownerId == userId;
    })[0];

    return room;
  }

  async findRoomById(RoomId: string): Promise<Room> {
    const room = this.items.filter(user => {
      return user.id == RoomId;
    })[0];
    console.log('this.items', this.items);
    console.log('room', room);

    return room;
  }

  async save(room: Room): Promise<void> {
    const userIndex = this.items.findIndex(findRoom => {
      findRoom.id === room.id;
    });

    this.items[userIndex] = room;
  }

  async create(room: Room): Promise<void> {
    console.log('create room = ', room);
    room.password = await hashedPassword(room.password);
    this.items.push(room);
  }
}
