import { InputType, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateFightInput {
  @IsInt()
  @IsNotEmpty()
  @Field()
  event_id?: number;

  @IsInt()
  @IsNotEmpty()
  @Field()
  fighter1_id?: number;

  @IsInt()
  @IsNotEmpty()
  @Field()
  fighter2_id?: number;

  @IsInt()
  @IsOptional()
  @Field({ nullable: true })
  winner_id?: number;

  @IsString()
  @IsNotEmpty()
  @Field()
  result_method?: string;
}