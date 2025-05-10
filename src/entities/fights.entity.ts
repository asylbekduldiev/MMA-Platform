import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Event } from './events.entity';
import { Fighter } from './fighter.entity';

@Entity('fights')
export class Fight {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => Fighter, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fighter1_id' })
  fighter1: Fighter;

  @ManyToOne(() => Fighter, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fighter2_id' })
  fighter2: Fighter;

  @ManyToOne(() => Fighter, { nullable: true })
  @JoinColumn({ name: 'winner_id' })
  winner?: Fighter;

  @Column({ type: 'varchar', length: 50 })
  result_method: string;
}
