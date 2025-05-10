import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from '../../entities/events.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Fight } from '../../entities/fights.entity';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => [Event], { name: 'events' })
  async findAll() {
    return this.eventService.findAll();
  }

  @Query(() => Event, { name: 'event' })
  async findOne(@Args('id', { type: () => Number }) id: number) {
    return this.eventService.findOne(id);
  }

  @Query(() => [Event], { name: 'upcomingEvents' })
  async findUpcoming() {
    return this.eventService.findUpcoming();
  }

  @Query(() => [Fight], { name: 'eventFightCard' })
  async getFightCard(@Args('id', { type: () => Number }) id: number) {
    return this.eventService.getFightCard(id);
  }

  @Mutation(() => Event, { name: 'createEvent' })
  async create(@Args('input') input: CreateEventInput) {
    return this.eventService.create(input);
  }

  @Mutation(() => Event, { name: 'updateEvent' })
  async update(
    @Args('id', { type: () => Number }) id: number,
    @Args('input') input: UpdateEventInput,
  ) {
    return this.eventService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteEvent' })
  async remove(@Args('id', { type: () => Number }) id: number) {
    return this.eventService.remove(id);
  }
}
