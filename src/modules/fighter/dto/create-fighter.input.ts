import { StatsInput } from './stats.input'; // Убедись, что путь правильный
import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateFighterInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  weight_class!: string;

  @Field(() => StatsInput, { nullable: true })  
  @IsOptional()
  @ValidateNested()
  @Type(() => StatsInput)
  stats?: StatsInput;
}