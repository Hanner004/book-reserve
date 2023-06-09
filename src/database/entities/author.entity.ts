import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Book } from '../entities';
import {} from '../enums';

@Entity()
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
