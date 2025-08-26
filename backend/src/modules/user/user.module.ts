import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UsersController],
  exports: [UserService],
})
export class UserModule {}
