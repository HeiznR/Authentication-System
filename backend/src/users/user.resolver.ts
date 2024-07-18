import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserType } from './user.type';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver(() => UserType)
export class userResolver {
  constructor(private userService: UserService) {}
  @Query(() => [UserType])
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
