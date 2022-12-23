import { Either, left } from '../../../../core/logic/Either';
import { Room } from '../../Domain/Room';
import { IRoomRepository } from '../../repositories/IRoomRepository';
import { RoomDontFind } from '../Errors/RoomDontFind';

export interface IEditRoom {
  id: string;
  name?: string;
  isPrivate?: boolean;
  password?: string;
}

export type editRoomReturns = Either<RoomDontFind, Room>;

export class EditRoom {
  protected roomRepository: IRoomRepository;

  constructor(roomRepository: IRoomRepository) {
    this.roomRepository = roomRepository;
  }

  async edit(EditRoom: IEditRoom): Promise<editRoomReturns> {
    const roomToEdit = await this.roomRepository.findRoomById(EditRoom.id);

    if (!roomToEdit) {
      return left(new RoomDontFind());
    }

    const room = Room.create({
      id: roomToEdit.id,
      name: EditRoom.name || roomToEdit.name,
      isPrivate: String(EditRoom.isPrivate) === 'true' ? true : false,
      password: EditRoom.password || roomToEdit.password,
      ownerId: roomToEdit.ownerId,
      clients: [],
      messages: [],
    });

    if (room.isLeft()) {
      throw room.value;
    }

    await this.roomRepository.save(room.value);

    return room;
  }
}
