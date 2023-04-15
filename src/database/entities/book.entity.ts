import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Author, Editorial } from '../entities';
import {} from '../enums';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  availableQuantity: number;
  @Column()
  libraryLocation: string;
  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
  @ManyToOne(() => Editorial, (editorial) => editorial.books)
  editorial: Editorial;
}
