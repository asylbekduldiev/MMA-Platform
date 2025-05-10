import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StatsOutput } from './stats.output';

@ObjectType()
export class FighterType {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  weight_class!: string;

  @Field(() => StatsOutput)
  stats!: StatsOutput;
}