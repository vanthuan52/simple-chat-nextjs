import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async ensureDirectRoom(userOne: string, userTwo: string) {
    // naive: find existing room with exactly these two users
    const rooms = await this.prisma.room.findMany({
      where: { users: { some: { id: userOne } } },
      include: { users: true },
    });

    const found = rooms.find(
      (r) => r.users.length === 2 && r.users.some((u) => u.id === userTwo),
    );

    if (found) return found;

    return this.prisma.room.create({
      data: { users: { connect: [{ id: userOne }, { id: userTwo }] } },
    });
  }

  getRoom(roomId: string) {
    return this.prisma.room.findUnique({ where: { id: roomId } });
  }

  listMyRooms(userId: string) {
    return this.prisma.room.findMany({
      where: { users: { some: { id: userId } } },
      include: { users: { select: { id: true, username: true } } },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
