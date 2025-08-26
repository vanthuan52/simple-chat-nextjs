import { Module } from '@nestjs/common';
import { MessageModule } from '../message/message.module';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [MessageModule],
  providers: [ChatGateway, PrismaService],
})
export class ChatModule {}
