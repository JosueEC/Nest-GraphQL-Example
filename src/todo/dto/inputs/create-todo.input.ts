import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String)
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  description: string;
}
