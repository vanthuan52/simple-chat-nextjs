import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoomService } from './room.service';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('mine')
  listMine(@Req() req: any) {
    return this.roomService.listMyRooms(req.user.userId);
  }

  @Post('with/:userId')
  async direct(@Req() req: any, @Param('userId') otherId: string) {
    return this.roomService.ensureDirectRoom(req.user.userId, otherId);
  }
}
