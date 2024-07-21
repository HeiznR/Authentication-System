import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokenType } from './token.type';
import { Public } from './decorators/public-endpoint';
import { UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './Guards/GoogleAuthGuard';

export interface GraphQLContext {
  req: Request;
  res: Response;
}

@Resolver(() => TokenType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Context() context) {
    const { res } = context;
    res.redirect('/google');
  }

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
