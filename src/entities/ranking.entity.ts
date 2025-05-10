import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Fighter } from './fighter.entity';

@Entity('rankings')
export class Ranking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fighter_id: number;

  @ManyToOne(() => Fighter, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fighter_id' })
  fighter: Fighter;

  @Column()
  weight_class: string;

  @Column({ default: 0 })
  points: number;
}
