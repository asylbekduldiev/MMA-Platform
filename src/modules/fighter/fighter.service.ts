import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from '../../entities/fighter.entity';
import { Fight } from '../../entities/fights.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';

@Injectable()
export class FighterService {
  constructor(
    @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
    @InjectRepository(Fight) private fightRepository: Repository<Fight>,
  ) {}

  async findAll(): Promise<Fighter[]> {
    return this.fighterRepository.find();
  }

  async findOne(id: number): Promise<Fighter> {
    return this.fighterRepository.findOneOrFail({ where: { id } });
  }

  async findByWeightClass(weightClass: string): Promise<Fighter[]> {
    return this.fighterRepository.find({
      where: { weight_class: weightClass },
    });
  }

  async create(input: CreateFighterInput): Promise<Fighter> {
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
    return this.fighterRepository.save(fighter);
  }

  async update(id: number, input: UpdateFighterInput): Promise<Fighter> {
    try {
      const updateData = { ...input };
      if (input.stats) {
        updateData.stats = input.stats;
      }
      await this.fighterRepository.update(id, updateData);
      return this.fighterRepository.findOneOrFail({ where: { id } });
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

  async getStats(id: number): Promise<Fighter> {
    return this.fighterRepository.findOneOrFail({
      where: { id },
      select: ['id', 'name', 'stats'],
    });
  }

  async getFightHistory(id: number): Promise<Fight[]> {
    return this.fightRepository.find({
      where: [{ fighter1: { id } }, { fighter2: { id } }],
      relations: ['event'],
    });
  }
}
