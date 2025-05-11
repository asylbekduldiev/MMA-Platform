import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from '../../entities/ranking.entity';
import { Fighter } from '../../entities/fighter.entity';
import { Fight } from '../../entities/fights.entity';
import { setTimeout } from 'timers/promises';
import { RankingType } from '../../types/ranking.type';
import { FighterType } from '../../types/fighter.type';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking) private rankingRepository: Repository<Ranking>,
    @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
    @InjectRepository(Fight) private fightRepository: Repository<Fight>,
  ) {}

  async findAll(): Promise<RankingType[]> {
    const rankings = await this.rankingRepository.find({ relations: ['fighter'] });
    return rankings.map(ranking => this.mapToRankingType(ranking));
  }

  async findByWeightClass(weightClass: string): Promise<RankingType[]> {
    const rankings = await this.rankingRepository.find({
      where: { weight_class: weightClass },
      relations: ['fighter'],
      order: { points: 'DESC' },
    });
    return rankings.map(ranking => this.mapToRankingType(ranking));
  }

  private mapToRankingType(ranking: Ranking): RankingType {
    const fighterType: FighterType | undefined = ranking.fighter ? {
      id: ranking.fighter.id,
      name: ranking.fighter.name,
      weight_class: ranking.fighter.weight_class,
      stats: {
        wins: ranking.fighter.stats.wins || 0,
        losses: ranking.fighter.stats.losses || 0,
        draws: ranking.fighter.stats.draws || 0,
        knockouts: ranking.fighter.stats.knockouts || 0,
        submissions: ranking.fighter.stats.submissions || 0
      }
    } : undefined;

    return {
      id: ranking.id,
      fighter_id: ranking.fighter_id,
      fighter: fighterType,
      weight_class: ranking.weight_class,
      points: ranking.points
    };
  }

  async updateRankings(): Promise<void> {
    // get all last fights
    const fights = await this.fightRepository.find({
      relations: ['fighter1', 'fighter2', 'winner'],
    });

    // update fighter stats
    for (const fight of fights) {
      if (fight.winner?.id) {
        const winner = await this.fighterRepository.findOneOrFail({
          where: { id: fight.winner?.id },
        });
        const loser =
            fight.winner?.id === fight.winner?.id
            ? await this.fighterRepository.findOneOrFail({
                where: { id: fight.winner?.id },
              })
            : await this.fighterRepository.findOneOrFail({
                where: { id: fight.winner?.id },
              });

        const winnerStats = winner.stats;
        const loserStats = loser.stats;

        // update fighter stats
        const points =
          (winnerStats.wins || 0) *
          (fight.result_method === 'KO' || fight.result_method === 'SUBMISSION'
            ? 4
            : 3);
        winnerStats.wins = (winnerStats.wins || 0) + 1;
        if (fight.result_method === 'KO')
          winnerStats.knockouts = (winnerStats.knockouts || 0) + 1;
        if (fight.result_method === 'SUBMISSION')
          winnerStats.submissions = (winnerStats.submissions || 0) + 1;
        await this.fighterRepository.update(winner.id, { stats: winnerStats });

        // update loser stats
        loserStats.losses = (loserStats.losses || 0) + 1;
        await this.fighterRepository.update(loser.id, { stats: loserStats });

        // update rankings
        let ranking = await this.rankingRepository.findOne({
          where: { fighter_id: winner.id, weight_class: winner.weight_class },
        });
        if (!ranking) {
          ranking = this.rankingRepository.create({
            fighter_id: winner.id,
            weight_class: winner.weight_class,
            points: 0,
          });
        }
        ranking.points +=
          fight.result_method === 'KO' || fight.result_method === 'SUBMISSION'
            ? 4
            : 3;
        await this.rankingRepository.save(ranking);

        ranking = await this.rankingRepository.findOne({
          where: { fighter_id: loser.id, weight_class: loser.weight_class },
        });
        if (!ranking) {
          ranking = this.rankingRepository.create({
            fighter_id: loser.id,
            weight_class: loser.weight_class,
            points: 0,
          });
        }
        await this.rankingRepository.save(ranking);
      } else {
        // draw
        const fighter1 = await this.fighterRepository.findOneOrFail({
          where: { id: fight.winner?.id },
        });
        const fighter2 = await this.fighterRepository.findOneOrFail({
          where: { id: fight.winner?.id },
        });

        let ranking1 = await this.rankingRepository.findOne({
          where: {
            fighter_id: fighter1.id,
            weight_class: fighter1.weight_class,
          },
        });
        if (!ranking1) {
          ranking1 = this.rankingRepository.create({
            fighter_id: fighter1.id,
            weight_class: fighter1.weight_class,
            points: 0,
          });
        }
        ranking1.points += 1;
        await this.rankingRepository.save(ranking1);

        let ranking2 = await this.rankingRepository.findOne({
          where: {
            fighter_id: fighter2.id,
            weight_class: fighter2.weight_class,
          },
        });
        if (!ranking2) {
          ranking2 = this.rankingRepository.create({
            fighter_id: fighter2.id,
            weight_class: fighter2.weight_class,
            points: 0,
          });
        }
        ranking2.points += 1;
        await this.rankingRepository.save(ranking2);

        fighter1.stats.draws = (fighter1.stats.draws || 0) + 1;
        fighter2.stats.draws = (fighter2.stats.draws || 0) + 1;
        await this.fighterRepository.update(fighter1.id, {
          stats: fighter1.stats,
        });
        await this.fighterRepository.update(fighter2.id, {
          stats: fighter2.stats,
        });
      }
    }
  }

  // background update rankings
  async triggerRankingUpdate(fightId: number): Promise<void> {
    // simulate async operation
    await setTimeout(0);
    const fight = await this.fightRepository.findOneOrFail({
      where: { id: fightId },
      relations: ['fighter1', 'fighter2', 'winner'],
    });
    if (fight.winner?.id) {
      const winner = await this.fighterRepository.findOneOrFail({
        where: { id: fight.winner?.id },
      });
      const loser =
        fight.winner?.id === fight.winner?.id
          ? await this.fighterRepository.findOneOrFail({
              where: { id: fight.winner?.id },
            })
          : await this.fighterRepository.findOneOrFail({
              where: { id: fight.winner?.id },
            });

      let ranking = await this.rankingRepository.findOne({
        where: { fighter_id: winner.id, weight_class: winner.weight_class },
      });
      if (!ranking) {
        ranking = this.rankingRepository.create({
          fighter_id: winner.id,
          weight_class: winner.weight_class,
          points: 0,
        });
      }
      ranking.points +=
        fight.result_method === 'KO' || fight.result_method === 'SUBMISSION'
          ? 4
          : 3;
      await this.rankingRepository.save(ranking);

      ranking = await this.rankingRepository.findOne({
        where: { fighter_id: loser.id, weight_class: loser.weight_class },
      });
      if (!ranking) {
        ranking = this.rankingRepository.create({
          fighter_id: loser.id,
          weight_class: loser.weight_class,
          points: 0,
        });
      }
      await this.rankingRepository.save(ranking);
    } else {
      const fighter1 = await this.fighterRepository.findOneOrFail({
        where: { id: fight.winner?.id },
      });
      const fighter2 = await this.fighterRepository.findOneOrFail({
        where: { id: fight.winner?.id },
      });

      let ranking1 = await this.rankingRepository.findOne({
        where: { fighter_id: fighter1.id, weight_class: fighter1.weight_class },
      });
      if (!ranking1) {
        ranking1 = this.rankingRepository.create({
          fighter_id: fighter1.id,
          weight_class: fighter1.weight_class,
          points: 0,
        });
      }
      ranking1.points += 1;
      await this.rankingRepository.save(ranking1);

      let ranking2 = await this.rankingRepository.findOne({
        where: { fighter_id: fighter2.id, weight_class: fighter2.weight_class },
      });
      if (!ranking2) {
        ranking2 = this.rankingRepository.create({
          fighter_id: fighter2.id,
          weight_class: fighter2.weight_class,
          points: 0,
        });
      }
      ranking2.points += 1;
      await this.rankingRepository.save(ranking2);
    }
  }
}
