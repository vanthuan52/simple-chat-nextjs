import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  list() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('friends')
  listFriends(@Req() req: any) {
    return this.userService.findAllExcept(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/:userId')
  findById(@Req() req: any, @Param('userId') userId: string) {
    return this.userService.findById(userId);
  }
}
