import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import {} from '../entities';
import { UserRoleEnum } from '../enums';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  @Index('IDX_user_email', { unique: true, where: `(deleted_at is null)` })
  email: string;
  @Column({ select: false })
  password: string;
  @Column({ type: 'enum', enum: UserRoleEnum })
  role: UserRoleEnum;
}
