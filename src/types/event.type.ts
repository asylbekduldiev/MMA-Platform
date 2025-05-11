// src/modules/fight/types/event.type.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class EventType {
  @Field(() => Int)
  id!: number;

  @Field()
  location!: string;

  @Field()
  event_date!: string;
}