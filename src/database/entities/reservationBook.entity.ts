import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Reservation, Book } from '../entities';
import {} from '../enums';

@Entity()
export class ReservationBook extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @ManyToOne(() => Reservation, (reservation) => reservation.reservationBooks)
  reservation: Reservation;
  @ManyToOne(() => Book, (book) => book.reservationBooks)
  book: Book;
}
