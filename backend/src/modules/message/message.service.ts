import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  listByRoom(roomId: string, take = 50) {
    return this.prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
      take,
      include: { user: { select: { id: true, username: true } } },
    });
  }

  async create(userId: string, roomId: string, content: string) {
    const msg = await this.prisma.message.create({
      data: { userId, roomId, content },
    });
    await this.prisma.room.update({
      where: { id: roomId },
      data: { updatedAt: new Date() },
    });
    return msg;
  }
}
