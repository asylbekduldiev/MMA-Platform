import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RankingService } from './ranking.service';
import { Ranking } from '../../entities/ranking.entity';
import { RankingType } from '../../types/ranking.type';

@Resolver(() => RankingType)
export class RankingResolver {
  constructor(private readonly rankingService: RankingService) {}

  @Query(() => [RankingType], { name: 'rankings' })
  async findAll() {
    return this.rankingService.findAll();
  }

  @Query(() => [RankingType], { name: 'rankingsByWeightClass' })
  async findByWeightClass(
    @Args('weightClass', { type: () => String }) weightClass: string,
  ) {
    return this.rankingService.findByWeightClass(weightClass);
  }

  @Mutation(() => Boolean, { name: 'updateRankings' })
  async updateRankings() {
    await this.rankingService.updateRankings();
    return true;
  }
}
