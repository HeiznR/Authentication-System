import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokenType } from './token.type';
import { Public } from './decorators/public-endpoint';
import { UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './Guards/GoogleAuthGuard';
import { ConfigService } from '@nestjs/config';

export interface GraphQLContext {
  req: Request;
  res: Response;
}

@Resolver(() => TokenType)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  // @Query(() => String)
  // @UseGuards(GoogleAuthGuard)
  // async googleAuth(): Promise<string> {
  //   const url = this.config.get<string>('GOOGLE_CALLBACK_URL');
  //   return url;
  // }

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
