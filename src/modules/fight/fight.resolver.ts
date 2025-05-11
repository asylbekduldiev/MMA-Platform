import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FightService } from './fight.service';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';
import { FightType } from '../../types/fight.type';

@Resolver(() => FightType)
export class FightResolver {
  constructor(private readonly fightService: FightService) {}

  @Query(() => [FightType], { name: 'fights' })
  async findAll() {
    return this.fightService.findAll();
  }

  @Query(() => FightType, { name: 'fight' })
  async findOne(@Args('id', { type: () => Number }) id: number) {
    return this.fightService.findOne(id);
  }

  @Mutation(() => FightType, { name: 'createFight' })
  async create(@Args('input', { type: () => CreateFightInput }) input: CreateFightInput) {
    return this.fightService.create(input);
  }

  @Mutation(() => FightType, { name: 'updateFight' })
  async update(
    @Args('id', { type: () => Number }) id: number,
    @Args('input', { type: () => UpdateFightInput }) input: UpdateFightInput,
  ) {
    return this.fightService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteFight' })
  async remove(@Args('id', { type: () => Number }) id: number) {
    return this.fightService.remove(id);
  }
}