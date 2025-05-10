import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsDateString } from 'class-validator';

@InputType()
export class UpdateEventInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  location?: string;

  @IsDateString()
  @IsOptional()
  @Field({ nullable: true })
  event_date?: string;
}