import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { MessageService } from './message.service';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('room/:roomId')
  list(@Param('roomId') roomId: string, @Query('take') take?: string) {
    const t = take ? parseInt(take, 10) : 50;
    return this.messageService.listByRoom(roomId, t);
  }
}
