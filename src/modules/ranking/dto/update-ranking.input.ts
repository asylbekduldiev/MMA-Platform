import { InputType, Field } from '@nestjs/graphql';
import { IsInt, IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateRankingInput {
  @IsInt()
  @IsOptional()
  @Field({ nullable: true })
  fighter_id?: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  weight_class?: string;

  @IsInt()
  @IsOptional()
  @Field({ nullable: true })
  points?: number;
}