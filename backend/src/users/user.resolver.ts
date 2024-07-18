import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserType } from './user.type';

@Resolver(() => UserType)
export class userResolver {
  constructor(private userService: UserService) {}
  @Query(() => [UserType])
  getUsers() {
    return this.userService.getUsers();
  }

  @Query(() => UserType)
  getUser() {
    return this.userService.getUser();
  }

  @Query(() => UserType)
  getUserById(@Args('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Mutation(() => UserType)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Mutation(() => String)
  deleteUser(@Args('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
