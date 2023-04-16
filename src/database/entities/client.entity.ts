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
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @Index('IDX_client_dni', { unique: true, where: `(deleted_at is null)` })
  dni: string;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  phone: string;
  @OneToMany(() => Reservation, (reservation) => reservation.client)
  reservations: Reservation[];
}
