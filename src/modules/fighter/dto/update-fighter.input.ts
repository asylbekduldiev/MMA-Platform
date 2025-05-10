import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateFighterInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  weight_class?: string;

  @IsOptional()
  @Field({ nullable: true })
  stats?: {
    wins?: number;
    losses?: number;
    draws?: number;
    knockouts?: number;
    submissions?: number;
  };
}
