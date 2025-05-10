import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from '../../entities/fights.entity';
import { Fighter } from '../../entities/fighter.entity';
import { Event } from '../../entities/events.entity';
import { CreateFightInput } from './dto/create-fight.input';
import { UpdateFightInput } from './dto/update-fight.input';

@Injectable()
export class FightService {
  constructor(
    @InjectRepository(Fight) private fightRepository: Repository<Fight>,
    @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  async findAll(): Promise<Fight[]> {
    return this.fightRepository.find({
      relations: ['event', 'fighter1', 'fighter2', 'winner'],
    });
  }

  async findOne(id: number): Promise<Fight> {
    return this.fightRepository.findOneOrFail({
      where: { id },
      relations: ['event', 'fighter1', 'fighter2', 'winner'],
    });
  }

  async create(input: CreateFightInput): Promise<Fight> {
    // Проверка существования события и бойцов
    await this.eventRepository.findOneOrFail({ where: { id: input.event_id } });
    await this.fighterRepository.findOneOrFail({
      where: { id: input.fighter1_id },
    });
    await this.fighterRepository.findOneOrFail({
      where: { id: input.fighter2_id },
    });
    if (input.winner_id) {
      await this.fighterRepository.findOneOrFail({
        where: { id: input.winner_id },
      });
    }

    const fight = this.fightRepository.create(input);
    return this.fightRepository.save(fight);
  }

  async update(id: number, input: UpdateFightInput): Promise<Fight> {
    // CHeck existence of the fight
    await this.fightRepository.findOneOrFail({ where: { id } });

    // CHeck existence of the event and fighters
    if (input.event_id) {
      await this.eventRepository.findOneOrFail({
        where: { id: input.event_id },
      });
    }
    if (input.fighter1_id) {
      await this.fighterRepository.findOneOrFail({
        where: { id: input.fighter1_id },
      });
    }
    if (input.fighter2_id) {
      await this.fighterRepository.findOneOrFail({
        where: { id: input.fighter2_id },
      });
    }
    if (input.winner_id) {
      await this.fighterRepository.findOneOrFail({
        where: { id: input.winner_id },
      });
    }

    await this.fightRepository.update(id, input);
    return this.fightRepository.findOneOrFail({
      where: { id },
      relations: ['event', 'fighter1', 'fighter2', 'winner'],
    });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.fightRepository.delete(id);
    return !!result.affected;
  }
}
