import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateFighterInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  weight_class: string;

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
