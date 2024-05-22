import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, usersResolver],
})
export class UsersModule {}
