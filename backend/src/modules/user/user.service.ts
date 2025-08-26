import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findAll() {
    return this.prisma.user.findMany({ select: { id: true, username: true } });
  }
  findAllExcept(userId: string) {
    return this.prisma.user.findMany({
      where: { id: { not: userId } },
      select: { id: true, username: true },
    });
  }
}
