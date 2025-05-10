import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateFighterInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  weight_class?: string;

  @Field({ nullable: true })
  @IsOptional()
  stats?: {
    wins?: number;
    losses?: number;
    draws?: number;
    knockouts?: number;
    submissions?: number;
  };
}
