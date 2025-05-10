import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fight } from '../../entities/fights.entity';
import { Fighter } from '../../entities/fighter.entity';
import { Event } from '../../entities/events.entity';
import { FightResolver } from './fight.resolver';
import { FightService } from './fight.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fight, Fighter, Event])],
  providers: [FightResolver, FightService],
})
export class FightModule {}
