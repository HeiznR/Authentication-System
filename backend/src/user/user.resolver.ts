import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver()
export class userResolver {
  constructor(private userService: UserService) {}

  @Query()
  getUsers() {
    return this.userService.getUsers();
  }
  @Mutation()
  createUser(@Args('name') name: string, @Args('surname') surname: string) {
    return this.userService.createUser(name, surname);
  }

  @Mutation()
  addSubscriber(
    @Args('userId') userId: string,
    @Args('name') name: string,
    @Args('surname') surname: string,
  ) {
    return this.userService.addSubscriber(userId, name, surname);
  }
}
