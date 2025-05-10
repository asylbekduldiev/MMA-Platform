import { InputType, Field } from '@nestjs/graphql';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRankingInput {
  @IsInt()
  @IsNotEmpty()
  @Field()
  fighter_id: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  weight_class: string;

  @IsInt()
  @IsNotEmpty()
  @Field()
  points: number;
}