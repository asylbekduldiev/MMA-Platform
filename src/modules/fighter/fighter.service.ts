import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from '../../entities/fighter.entity';
import { Fight } from '../../entities/fights.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';
import { FighterType } from '../../types/fighter.type';
import { FightType } from '../../types/fight.type';

@Injectable()
export class FighterService {
  constructor(
    @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
    @InjectRepository(Fight) private fightRepository: Repository<Fight>,
  ) {}

  async findAll(): Promise<FighterType[]> {
    const fighters = await this.fighterRepository.find();
    return fighters.map(fighter => this.mapToFighterType(fighter));
  }

  async findOne(id: number): Promise<FighterType> {
    const fighter = await this.fighterRepository.findOneOrFail({ where: { id } });
    return this.mapToFighterType(fighter);
  }

  async findByWeightClass(weightClass: string): Promise<FighterType[]> {
    const fighters = await this.fighterRepository.find({
      where: { weight_class: weightClass },
    });
    return fighters.map(fighter => this.mapToFighterType(fighter));
  }

  async create(input: CreateFighterInput): Promise<FighterType> {
    const fighter = this.fighterRepository.create({
      name: input.name,
      weight_class: input.weight_class,
      stats: input.stats || {
        wins: 0,
        losses: 0,
        draws: 0,
        knockouts: 0,
        submissions: 0,
      },
    });
    const savedFighter = await this.fighterRepository.save(fighter);
    return this.mapToFighterType(savedFighter);
  }

  async update(id: number, input: UpdateFighterInput): Promise<FighterType> {
    try {
      const updateData = { ...input };
      if (input.stats) {
        updateData.stats = input.stats;
      }
      await this.fighterRepository.update(id, updateData);
      const updatedFighter = await this.fighterRepository.findOneOrFail({ where: { id } });
      return this.mapToFighterType(updatedFighter);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`"Something went wrong"`);
      } else {
        throw new Error(`"An unexpected error occurred"`);
      }
    }
  }
  async remove(id: number): Promise<boolean> {
    const result = await this.fighterRepository.delete(id);
    return !!result.affected;
  }

  async getStats(id: number): Promise<FighterType> {
    const fighter = await this.fighterRepository.findOneOrFail({
      where: { id },
      select: ['id', 'name', 'stats', 'weight_class'],
    });
    return this.mapToFighterType(fighter);
  }

  async getFightHistory(id: number): Promise<FightType[]> {
    const fights = await this.fightRepository.find({
      where: [{ fighter1: { id } }, { fighter2: { id } }],
      relations: ['event', 'fighter1', 'fighter2', 'winner'],
    });
    return fights.map(fight => this.mapToFightType(fight));
  }

  private mapToFighterType(fighter: Fighter): FighterType {
    return {
      id: fighter.id,
      name: fighter.name,
      weight_class: fighter.weight_class,
      stats: {
        wins: fighter.stats?.wins || 0,
        losses: fighter.stats?.losses || 0,
        draws: fighter.stats?.draws || 0,
        knockouts: fighter.stats?.knockouts || 0,
        submissions: fighter.stats?.submissions || 0
      }
    };
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
}
