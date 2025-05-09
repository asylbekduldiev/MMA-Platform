import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Event } from './event.entity';
import { Fighter } from './fighter.entity';

@Entity('fights')
export class Fight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_id: number;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  fighter1_id: number;

  @ManyToOne(() => Fighter, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fighter1_id' })
  fighter1: Fighter;

  @Column()
  fighter2_id: number;

  @ManyToOne(() => Fighter, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fighter2_id' })
  fighter2: Fighter;

  @Column({ nullable: true })
  winner_id: number;

  @ManyToOne(() => Fighter, { nullable: true })
  @JoinColumn({ name: 'winner_id' })
  winner: Fighter;

  @Column()
  result_method: string;
}