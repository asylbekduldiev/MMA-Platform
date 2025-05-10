import { InputType, Field } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateFightInput {
  @IsInt()
  @IsOptional()
  @Field({ nullable: true })
  event_id?: number;

  @IsInt()
  @IsOptional()
  @Field({ nullable: true })
  fighter1_id?: number;

  @IsInt()
  @IsOptional()
  @Field({ nullable: true })
  fighter2_id?: number;

  @IsInt()
  @IsOptional()
  @Field({ nullable: true })
  winner_id?: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  result_method?: string;
}