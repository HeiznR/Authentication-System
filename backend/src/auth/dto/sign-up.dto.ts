import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class signUpDto {
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
