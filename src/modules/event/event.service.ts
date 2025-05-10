import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Event } from '../../entities/events.entity';
import { Fight } from '../../entities/fights.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Fight) private fightRepository: Repository<Fight>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    return this.eventRepository.findOneOrFail({ where: { id } });
  }

  async findUpcoming(): Promise<Event[]> {
    const today = new Date().toISOString().split('T')[0];
    return this.eventRepository.find({
      where: { event_date: MoreThanOrEqual(today) }
    });
  }

  async getFightCard(id: number): Promise<Fight[]> {
    return this.fightRepository.find({
      where: { event: { id } },
      relations: ['fighter1', 'fighter2'],
    });
  }

  async create(input: CreateEventInput): Promise<Event> {
    const event = this.eventRepository.create(input);
    return this.eventRepository.save(event);
  }

  async update(id: number, input: UpdateEventInput): Promise<Event> {
    await this.eventRepository.update(id, input);
    return this.eventRepository.findOneOrFail({ where: { id } });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.eventRepository.delete(id);
    return !!result.affected;
  }
}
