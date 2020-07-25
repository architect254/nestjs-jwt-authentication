import {
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import { User } from '../api/user/user.entity';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  dateCreated?: Date;

  @UpdateDateColumn()
  dateUpdated?: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  createdBy?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  updatedBy?: User;
}
