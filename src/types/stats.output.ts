import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StatsOutput {
  @Field(() => Int)
  wins!: number;

  @Field(() => Int)
  losses!: number;

  @Field(() => Int)
  draws!: number;

  @Field(() => Int)
  knockouts!: number;

  @Field(() => Int)
  submissions!: number;
}