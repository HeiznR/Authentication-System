import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsNotEmpty()
  @Field()
  userName: string;
  @IsNotEmpty()
  @Field()
  name: string;
  @IsNotEmpty()
  @Field()
  surname: string;
  @IsNotEmpty()
  @Field()
  email: string;
  @IsNotEmpty()
  @Field()
  password: string;
}
