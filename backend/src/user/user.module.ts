import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userResolver } from './user.resolver';

@Module({
  providers: [UserService, userResolver],
})
export class UserModule {}
