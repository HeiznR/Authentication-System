import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokenType } from './token.type';

@Resolver(() => TokenType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => TokenType)
  signUp(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
}
