import { User as PersistenceUser } from '@prisma/client';

import { Email } from '../Domain/Email'
import { Password } from '../Domain/Password'
import { User } from '../Domain/User'

export class UserMapper {
  static toDomain(raw: PersistenceUser): User | null {
    const emailOrError = Email.create(raw.email)
    const passwordOrError = Password.create(raw.password, true)

    if (emailOrError.isLeft()) {
      throw new Error('Email value is invalid.')
    }

    if (passwordOrError.isLeft()) {
      throw new Error('Password value is invalid.')
    }

    const userOrError = User.create(
      {
        username: raw.username,
        email: emailOrError.value,
        password: passwordOrError.value,
      },
      raw.id
    )

    if (userOrError.isRight()) {
      return userOrError.value
    }

    return null
  }

  static async toPersistence(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: await user.props.password.getHashedValue(),
    }
  }
}