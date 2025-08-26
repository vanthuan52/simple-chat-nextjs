import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password', 10);
  const alice = await prisma.user.upsert({
    where: { username: 'alice' },
    update: {},
    create: { username: 'alice', password },
  });

  const bob = await prisma.user.upsert({
    where: { username: 'bob' },
    update: {},
    create: { username: 'bob', password },
  });

  const room = await prisma.room.create({
    data: { users: { connect: [{ id: alice.id }, { id: bob.id }] } },
  });

  await prisma.message.create({
    data: { content: 'Hello Bob!', userId: alice.id, roomId: room.id },
  });

  console.log({ alice, bob, room });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
