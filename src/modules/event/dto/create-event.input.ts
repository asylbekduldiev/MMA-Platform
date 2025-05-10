import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

@InputType()
export class CreateEventInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  location?: string;

  @IsDateString()
  @IsNotEmpty()
  @Field()
  event_date?: string;
}