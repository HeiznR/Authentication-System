import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Resolver()
export class usersResolver {
  constructor(private userService: UsersService) {}
  @Query()
  @UseGuards(AuthGuard('jwt'))
  getUsers() {
    return this.userService.getUsers();
  }

  @Query()
  getUserById(@Args('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Mutation()
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Mutation()
  deleteUser(@Args('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
