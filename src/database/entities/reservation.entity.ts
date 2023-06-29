import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Client, ReservationBook } from '../entities';
import {} from '../enums';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ default: true })
  is_busy: boolean;
  @Column({ type: 'timestamp', nullable: true })
  delivered_at: Date;
  @ManyToOne(() => Client, (client) => client.reservations)
  client: Client;
  @OneToMany(
    () => ReservationBook,
    (reservationBook) => reservationBook.reservation,
  )
  reservationBooks: ReservationBook[];
}
