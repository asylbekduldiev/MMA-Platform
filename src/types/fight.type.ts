import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FightType {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  event_id!: number;

  @Field(() => Int)
  fighter1_id!: number;

  @Field(() => Int)
  fighter2_id!: number;

  @Field(() => Int, { nullable: true })
  winner_id?: number;

  @Field()
  result_method!: string;
}