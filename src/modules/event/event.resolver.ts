import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from '../../entities/events.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { FightType } from '../../types/fight.type';
import { EventType } from '../../types/event.type';

@Resolver(() => EventType)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => [EventType], { name: 'events' })
  async findAll() {
    return this.eventService.findAll();
  }

  @Query(() => EventType, { name: 'event' })
  async findOne(@Args('id', { type: () => Number }) id: number) {
    return this.eventService.findOne(id);
  }

  @Query(() => [EventType], { name: 'upcomingEvents' })
  async findUpcoming() {
    return this.eventService.findUpcoming();
  }

  @Query(() => [FightType], { name: 'eventFightCard' })
  async getFightCard(@Args('id', { type: () => Number }) id: number) {
    return this.eventService.getFightCard(id);
  }

  @Mutation(() => EventType, { name: 'createEvent' })
  async create(@Args('input', { type: () => CreateEventInput }) input: CreateEventInput) {
    return this.eventService.create(input);
  }

  @Mutation(() => EventType, { name: 'updateEvent' })
  async update(
    @Args('id', { type: () => Number }) id: number,
    @Args('input', { type: () => UpdateEventInput }) input: UpdateEventInput,
  ) {
    return this.eventService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteEvent' })
  async remove(@Args('id', { type: () => Number }) id: number) {
    return this.eventService.remove(id);
  }
}
