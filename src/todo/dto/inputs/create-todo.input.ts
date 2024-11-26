import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String)
  @IsString()
  @MaxLength(155)
  @IsNotEmpty()
  description: string;
}
