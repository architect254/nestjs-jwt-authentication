import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '../api/user/user.entity';
import { SignUpCredentialsDto } from './dtos/sign-up.dto';
import { SignInCredentialsDto } from './dtos/sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async signUp(credentials: SignUpCredentialsDto): Promise<User> {
    const { password, email } = credentials;

    const user = new User();

    user.email = email;

    await user.encrypt();
    await user.hashPassword(password);

    try {
      return await this.userRepo.save(user);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('user already exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async validateUserPassword(credentials: SignInCredentialsDto) {
    const { email, password } = credentials;
    const user = await this.userRepo.findOne({ email });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const isValid = await user.validatePassword(password);

    if (!isValid) {
      return null;
    }
    return user;
  }
}
