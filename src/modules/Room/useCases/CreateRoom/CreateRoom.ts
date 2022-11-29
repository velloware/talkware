import { Room, createRoomReturns } from '../../Domain/Room';
import { IRoomRepository } from '../../repositories/IRoomRepository';

export interface ICreateRoom {
  name: string;
  isPrivate: boolean;
  password?: string;
  ownerId: string;
}

export class CreateRooom {
  protected roomRepository: IRoomRepository;

  constructor(roomRepository: IRoomRepository) {
    this.roomRepository = roomRepository;
  }

  async create(CreateRoom: ICreateRoom): Promise<createRoomReturns> {
    const room = Room.create({
      name: CreateRoom.name,
      isPrivate: CreateRoom.isPrivate,
      password: CreateRoom.password || '',
      ownerId: CreateRoom.ownerId,
      clients: [],
      messages: [],
      id: '',
    });

    if (room.isLeft()) {
      throw room.value;
    }

    await this.roomRepository.create(room.value);

    room.value.props.password = '';

    return room;
  }
}
