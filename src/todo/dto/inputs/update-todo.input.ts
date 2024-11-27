import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  MaxLength,
  IsBoolean,
  IsOptional,
  IsPositive,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsNumber()
  @IsPositive()
  todoId: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
