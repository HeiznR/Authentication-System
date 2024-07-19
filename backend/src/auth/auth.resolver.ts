import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokenType } from './token.type';
import { Public } from './decorators/public-endpoint';

@Resolver(() => TokenType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => TokenType)
  @Public()
  signUp(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
  @Query(() => TokenType)
  @Public()
  logIn(
    @Args('userName') userName: string,
    @Args('password') password: string,
  ) {
    return this.authService.logIn(userName, password);
  }
}
