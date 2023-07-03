import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Client, ReservationBook } from '../entities';
import { ReservationStatusEnum } from '../enums';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'timestamp', nullable: true })
  finalized_at: Date;
  @Column({
    type: 'enum',
    enum: ReservationStatusEnum,
    default: ReservationStatusEnum.ACTIVE,
  })
  status: ReservationStatusEnum;
  @ManyToOne(() => Client, (client) => client.reservations)
  client: Client;
  @OneToMany(
    () => ReservationBook,
    (reservationBook) => reservationBook.reservation,
  )
  reservationBooks: ReservationBook[];
}
