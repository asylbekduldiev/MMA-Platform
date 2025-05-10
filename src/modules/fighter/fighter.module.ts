import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from '../../entities/fighter.entity';
import { FighterResolver } from './fighter.resolver';
import { FighterService } from './fighter.service';
import { Fight } from 'src/entities/fights.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter, Fight])],
  providers: [FighterResolver, FighterService],
})
export class FighterModule {}
