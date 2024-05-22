import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver()
export class usersResolver {
  constructor(private userService: UsersService) {}

  @Query()
  getUsers() {
    return this.userService.getUsers();
  }

  @Query()
  getUserById(@Args('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Mutation()
  createUser(@Args('name') name: string, @Args('surname') surname: string) {
    return this.userService.createUser(name, surname);
  }

  @Mutation()
  addSubscriber(@Args('userId') userId: string, @Args('subId') subId: string) {
    return this.userService.addSubscriber(userId, subId);
  }
}
