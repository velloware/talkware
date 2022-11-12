import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const UserDefaults = [
  {
    id: '1',
    username: 'admin',
    email: 'gabi@gmail.com',
    password: '123456',
  },
];

const RoomDefaults = [
  {
    id: '1',
    name: 'Room 1',
    isPrivate: false,
    password: '',
    ownerId: '1',
  },
  {
    id: '2',
    name: 'Room 2',
    isPrivate: false,
    password: '',
    ownerId: '1',
  },
  {
    id: '3',
    name: 'Room 3',
    isPrivate: false,
    password: '',
    ownerId: '1',
  },
];

async function main() {
  console.log('Start seeding 🌱🌾🌴');
  console.log('Start seeding UserDefaults ->');
  for (const user of UserDefaults) {
    const User = await prisma.user.create({
      data: user,
    });
    console.log(
      `Created user with id: ${User.id} and username: ${User.username}`,
    );
  }

  console.log('Start seeding RoomDefaults ->');
  for (const room of RoomDefaults) {
    const Room = await prisma.room.create({
      data: room,
    });
    console.log(`Created room with id: ${Room.id} and name: ${Room.name}`);
  }

  console.log('Seeding finished. 🌽🌳🌲');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
