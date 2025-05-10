import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from '../../entities/ranking.entity';
import { Fighter } from '../../entities/fighter.entity';
import { Fight } from '../../entities/fights.entity';
import { RankingResolver } from './ranking.resolver';
import { RankingService } from './ranking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking, Fighter, Fight])],
  providers: [RankingResolver, RankingService],
})
export class RankingModule {}
