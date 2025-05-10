import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FightService } from './fight.service';
import { Fight } from '../../entities/fights.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';

@Resolver(() => Fight)
export class FightResolver {
  constructor(private readonly fightService: FightService) {}

  @Query(() => [Fight], { name: 'fights' })
  async findAll() {
    return this.fightService.findAll();
  }

  @Query(() => Fight, { name: 'fight' })
  async findOne(@Args('id', { type: () => Number }) id: number) {
    return this.fightService.findOne(id);
  }

  @Mutation(() => Fight, { name: 'createFight' })
  async create(@Args('input') input: CreateFightInput) {
    return this.fightService.create(input);
  }

  @Mutation(() => Fight, { name: 'updateFight' })
  async update(
    @Args('id', { type: () => Number }) id: number,
    @Args('input') input: UpdateFightInput,
  ) {
    return this.fightService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteFight' })
  async remove(@Args('id', { type: () => Number }) id: number) {
    return this.fightService.remove(id);
  }
}
