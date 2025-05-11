import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FighterType } from './fighter.type';

@ObjectType()
export class RankingType {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  fighter_id!: number;

  @Field(() => FighterType, { nullable: true })
  fighter?: FighterType;

  @Field()
  weight_class!: string;

  @Field(() => Int)
  points!: number;
}