import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('fighters')
export class Fighter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  weight_class!: string;

  @Column({ type: 'jsonb' })
  stats!: {
    wins: number;
    losses: number;
    draws: number;
    knockouts: number;
    submissions: number;
  };
}
