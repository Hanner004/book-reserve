import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
  @Column({ default: false })
  is_deleted: boolean;
}
