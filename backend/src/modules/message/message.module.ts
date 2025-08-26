import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  providers: [MessageService, PrismaService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
