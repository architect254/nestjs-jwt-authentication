import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';

import { BaseEntity } from 'src/shared/base-entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  // @Column({ type: 'date' })
  // dob: Date;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;
}
