import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FighterService } from './fighter.service';
import { Fighter } from '../../entities/fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';
import { Fight } from 'src/entities/fights.entity';

@Resolver(() => Fighter)
export class FighterResolver {
  constructor(private readonly fighterService: FighterService) {}

  @Query(() => [Fighter], { name: 'fighters' })
  async findAll() {
    return this.fighterService.findAll();
  }

  @Query(() => Fighter, { name: 'fighter' })
  async findOne(@Args('id', { type: () => Number }) id: number) {
    return this.fighterService.findOne(id);
  }

  @Query(() => [Fighter], { name: 'fightersByWeightClass' })
  async findByWeightClass(
    @Args('weightClass', { type: () => String }) weightClass: string,
  ) {
    return this.fighterService.findByWeightClass(weightClass);
  }

  @Mutation(() => Fighter, { name: 'createFighter' })
  async create(@Args('input') input: CreateFighterInput) {
    return this.fighterService.create(input);
  }

  @Mutation(() => Fighter, { name: 'updateFighter' })
  async update(
    @Args('id', { type: () => Number }) id: number,
    @Args('input') input: UpdateFighterInput,
  ) {
    return this.fighterService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteFighter' })
  async remove(@Args('id', { type: () => Number }) id: number) {
    return this.fighterService.remove(id);
  }

  @Query(() => Fighter, { name: 'fighterStats' })
  async getStats(@Args('id', { type: () => Number }) id: number) {
    return this.fighterService.getStats(id);
  }

  @Query(() => [Fight], { name: 'fighterHistory' })
  async getFightHistory(@Args('id', { type: () => Number }) id: number) {
    return this.fighterService.getFightHistory(id);
  }
}
