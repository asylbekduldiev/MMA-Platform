import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Event } from '../../entities/events.entity';
import { Fight } from '../../entities/fights.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { EventType } from '../../types/event.type';
import { FightType } from '../../types/fight.type';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Fight) private fightRepository: Repository<Fight>,
  ) {}

  async findAll(): Promise<EventType[]> {
    const events = await this.eventRepository.find();
    return events.map(event => this.mapToEventType(event));
  }

  async findOne(id: number): Promise<EventType> {
    const event = await this.eventRepository.findOneOrFail({ where: { id } });
    return this.mapToEventType(event);
  }

  async findUpcoming(): Promise<EventType[]> {
    const today = new Date().toISOString().split('T')[0];
    const events = await this.eventRepository.find({
      where: { event_date: MoreThanOrEqual(today) }
    });
    return events.map(event => this.mapToEventType(event));
  }

  async getFightCard(id: number): Promise<FightType[]> {
    const fights = await this.fightRepository.find({
      where: { event: { id } },
      relations: ['fighter1', 'fighter2', 'event', 'winner'],
    });
    return fights.map(fight => this.mapToFightType(fight));
  }

  private mapToFightType(fight: Fight): FightType {
    return {
      id: fight.id,
      event_id: fight.event?.id,
      fighter1_id: fight.fighter1?.id,
      fighter2_id: fight.fighter2?.id,
      winner_id: fight.winner?.id,
      result_method: fight.result_method
    };
  }

  async create(input: CreateEventInput): Promise<EventType> {
    const event = this.eventRepository.create(input);
    const savedEvent = await this.eventRepository.save(event);
    return this.mapToEventType(savedEvent);
  }

  async update(id: number, input: UpdateEventInput): Promise<EventType> {
    await this.eventRepository.update(id, input);
    const updatedEvent = await this.eventRepository.findOneOrFail({ where: { id } });
    return this.mapToEventType(updatedEvent);
  }
  
  private mapToEventType(event: Event): EventType {
    return {
      id: event.id,
      location: event.location,
      event_date: event.event_date
    };
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.eventRepository.delete(id);
    return !!result.affected;
  }
}
