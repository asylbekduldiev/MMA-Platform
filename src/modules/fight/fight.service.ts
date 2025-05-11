import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from '../../entities/fights.entity';
import { Fighter } from '../../entities/fighter.entity';
import { Event } from '../../entities/events.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';
import { FightType } from 'src/types/fight.type'; // Импортируем правильный тип

@Injectable()
export class FightService {
  constructor(
    @InjectRepository(Fight) private fightRepository: Repository<Fight>,
    @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<FightType[]> {
    const fights = await this.fightRepository.find({
      relations: ['event', 'fighter1', 'fighter2', 'winner'],
    });
    return fights.map(fight => this.mapToFightType(fight)); // Преобразуем каждый fight в FightType
  }

  async findOne(id: number): Promise<FightType> {
    const fight = await this.fightRepository.findOneOrFail({
      where: { id },
      relations: ['event', 'fighter1', 'fighter2', 'winner'],
    });
    return this.mapToFightType(fight);
  }

  async create(input: CreateFightInput): Promise<FightType> {
    const event = await this.eventRepository.findOneOrFail({ where: { id: input.event_id } });
    const fighter1 = await this.fighterRepository.findOneOrFail({ where: { id: input.fighter1_id } });
    const fighter2 = await this.fighterRepository.findOneOrFail({ where: { id: input.fighter2_id } });
    const winner = input.winner_id ? await this.fighterRepository.findOneOrFail({ where: { id: input.winner_id } }) : null;

    const fight = this.fightRepository.create({
      event,
      fighter1,
      fighter2,
      ...(winner && { winner }),
      result_method: input.result_method,
    });

    const savedFight = await this.fightRepository.save(fight);

    return this.mapToFightType(savedFight);
  }

  private mapToFightType(fight: Fight): FightType {
    return {
      id: fight.id,
      event_id: fight.event.id,
      fighter1_id: fight.fighter1.id,
      fighter2_id: fight.fighter2.id,
      winner_id: fight.winner?.id,
      result_method: fight.result_method,
    };
  }

  async update(id: number, input: UpdateFightInput): Promise<FightType> {
    // CHeck existence of the fight
    const fight = await this.fightRepository.findOneOrFail({ where: { id } });

    // CHeck existence of the event and fighters
    if (input.event_id) {
      await this.eventRepository.findOneOrFail({ where: { id: input.event_id } });
    }
    if (input.fighter1_id) {
      await this.fighterRepository.findOneOrFail({ where: { id: input.fighter1_id } });
    }
    if (input.fighter2_id) {
      await this.fighterRepository.findOneOrFail({ where: { id: input.fighter2_id } });
    }
    if (input.winner_id) {
      await this.fighterRepository.findOneOrFail({ where: { id: input.winner_id } });
    }

    await this.fightRepository.update(id, input);
    const updatedFight = await this.fightRepository.findOneOrFail({
      where: { id },
      relations: ['event', 'fighter1', 'fighter2', 'winner'],
    });

    return this.mapToFightType(updatedFight);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.fightRepository.delete(id);
    return !!result.affected;
  }
}