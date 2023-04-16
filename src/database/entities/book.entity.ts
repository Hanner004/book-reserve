import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Author, Editorial, Reservation } from '../entities';
import {} from '../enums';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  available_quantity: number;
  @Column()
  library_location: string;
  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
  @ManyToOne(() => Editorial, (editorial) => editorial.books)
  editorial: Editorial;
  @OneToMany(() => Reservation, (reservation) => reservation.book)
  reservations: Reservation[];
}
