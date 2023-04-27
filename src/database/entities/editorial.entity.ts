import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Book } from '../entities';
import {} from '../enums';

@Entity()
export class Editorial extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(() => Book, (book) => book.editorial)
  books: Book[];
}
