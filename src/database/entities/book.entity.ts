import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Author, Editorial, ReservationBook } from '../entities';
import {} from '../enums';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @Column()
  available_quantity: number;
  @Column()
  library_location: string;
  @Column({ nullable: true })
  isbn_code: string;
  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
  @ManyToOne(() => Editorial, (editorial) => editorial.books)
  editorial: Editorial;
  @OneToMany(() => ReservationBook, (reservationBook) => reservationBook.book)
  reservationBooks: ReservationBook[];
}
