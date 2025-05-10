import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateFighterInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  weight_class: string;

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
