import { Room as PersistenceRoom } from '@prisma/client';

import { Room } from '../Domain/Room';

export class UserMapper {
  static toDomain(raw: PersistenceRoom): Room | null {

    const rommOrError = Room.create(
      {
        id: raw.id,
        isPrivate: raw.isPrivate,
        name: raw.name,
        password: raw.password,
        ownerId: raw.ownerId,
        messages: [],
        users: []
      }
    )

    if (rommOrError.isRight()) {
      return rommOrError.value
    }

    return null
  }

  static async toPersistence(Room: Room) {
    return {
      id: Room.props.id,
      name: Room.props.name,
      isPrivate: Room.props.isPrivate,
      password: Room.props.password,
      ownerId: Room.props.ownerId
    }
  }
}