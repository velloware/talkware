import { UserMapper } from '../../mappers/UserMapper';
import { prisma } from '../../../../infra/prisma/client';
import { User } from '../../Domain/User';
import { IUsersRepository } from '../IUsersRepository';

export class PrismaUsersRepository implements IUsersRepository {
  async exists(email: string): Promise<boolean> {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    return !!userExists;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    user.password = '*******';

    return UserMapper.toDomain(user);
  }

  async save(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data,
    });
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user);

    await prisma.user.create({ data });
  }
}
