import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserType } from './user.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public-endpoint';
import { UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/Guards/GoogleAuthGuard';

@Resolver(() => UserType)
export class userResolver {
  constructor(private userService: UserService) {}
  @Query(() => [UserType])
  @UseGuards(GoogleAuthGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Query(() => UserType)
  getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Mutation(() => UserType)
  updateUser(
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
    @Args('id') id: string,
  ) {
    return this.userService.updateUser(updateUserDto, id);
  }

  @Mutation(() => UserType)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Mutation(() => String)
  deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
