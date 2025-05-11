import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FighterService } from './fighter.service';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';
import { FightType } from '../../types/fight.type';
import { FighterType } from '../../types/fighter.type'; // 👈 добавлен правильный тип

@Resolver(() => FighterType)
export class FighterResolver {
  constructor(private readonly fighterService: FighterService) {}

  @Query(() => [FighterType], { name: 'fighters' })
  async findAll() {
    return this.fighterService.findAll();
  }

  @Query(() => FighterType, { name: 'fighter' })
  async findOne(@Args('id', { type: () => Number }) id: number) {
    return this.fighterService.findOne(id);
  }

  @Query(() => [FighterType], { name: 'fightersByWeightClass' })
  async findByWeightClass(
    @Args('weightClass', { type: () => String }) weightClass: string,
  ) {
    return this.fighterService.findByWeightClass(weightClass);
  }

  @Mutation(() => FighterType, { name: 'createFighter' })
  async create(
    @Args('input', { type: () => CreateFighterInput }) input: CreateFighterInput,
  ) {
    return this.fighterService.create(input);
  }

  @Mutation(() => FighterType, { name: 'updateFighter' })
  async update(
    @Args('id', { type: () => Number }) id: number,
    @Args('input', { type: () => UpdateFighterInput }) input: UpdateFighterInput,
  ) {
    return this.fighterService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteFighter' })
  async remove(@Args('id', { type: () => Number }) id: number) {
    return this.fighterService.remove(id);
  }

  @Query(() => FighterType, { name: 'fighterStats' })
  async getStats(@Args('id', { type: () => Number }) id: number) {
    return this.fighterService.getStats(id);
  }

  @Query(() => [FightType], { name: 'fighterHistory' })
  async getFightHistory(@Args('id', { type: () => Number }) id: number) {
    return this.fighterService.getFightHistory(id);
  }
}