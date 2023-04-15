import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export class PersonEntity extends BaseEntity {
  @Column()
  dni: string;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column()
  email: string;
  @Column()
  phone: string;
}

/**
 * this entity will be parameterized for all users people
 */
