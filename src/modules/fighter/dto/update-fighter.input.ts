import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';
import { StatsInput } from './stats.input'; // Убедись, что путь правильный

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

  @Field(() => StatsInput, { nullable: true }) 
  @IsOptional()
  stats?: StatsInput;
}