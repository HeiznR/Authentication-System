import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/sign-up.dto';
import { signInDto } from './dto/sign-in.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async signUp(
    @Args('signUpDto') signUpDto: signUpDto,
  ): Promise<{ token: string }> {
    return await this.authService.signUp(signUpDto);
  }
  @Mutation(() => String)
  async signIn(
    @Args('signInDto') signInDto: signInDto,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(signInDto);
  }
}
