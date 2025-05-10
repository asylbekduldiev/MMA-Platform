import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../entities/events.entity';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';
import { Fight } from 'src/entities/fights.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Fight])],
  providers: [EventResolver, EventService],
})
export class EventModule {}
