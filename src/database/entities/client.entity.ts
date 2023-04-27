import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Reservation } from '../entities';
import {} from '../enums';

@Entity()
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  @Index('IDX_client_dni', { unique: true, where: `(deleted_at is null)` })
  dni: string;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @OneToMany(() => Reservation, (reservation) => reservation.client)
  reservations: Reservation[];
}
