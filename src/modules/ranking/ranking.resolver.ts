import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RankingService } from './ranking.service';
import { Ranking } from '../../entities/ranking.entity';

@Resolver(() => Ranking)
export class RankingResolver {
  constructor(private readonly rankingService: RankingService) {}

  @Query(() => [Ranking], { name: 'rankings' })
  async findAll() {
    return this.rankingService.findAll();
  }

  @Query(() => [Ranking], { name: 'rankingsByWeightClass' })
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
