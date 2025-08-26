import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  providers: [RoomService, PrismaService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
