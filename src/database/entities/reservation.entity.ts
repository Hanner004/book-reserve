import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Book, Client } from '../entities';
import {} from '../enums';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ default: true })
  is_busy: boolean;
  @ManyToOne(() => Book, (book) => book.reservations)
  book: Book;
  @ManyToOne(() => Client, (client) => client.reservations)
  client: Client;
}
