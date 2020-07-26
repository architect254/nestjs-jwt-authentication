import { InternalServerErrorException } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';

import { BaseEntity } from 'src/shared/base-entity';
import { encryptionService } from '../../auth/encryption.service';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstname: string;

  @Column()
  surname: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt?: string;

  public encrypt() {
    return encryptionService.genSalt().then(salt => {
      this.salt = salt;
    });
  }

  hashPassword(password: string) {
    return encryptionService
      .hash(password, this.salt)
      .then((hash: string) => {
        this.password = hash;
      })
      .catch(error => {
        throw new InternalServerErrorException(error);
      });
  }

  async validatePassword(password) {
    return await encryptionService.compare(password, this.password);
  }
}
