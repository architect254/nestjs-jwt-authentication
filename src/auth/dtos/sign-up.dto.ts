import { SignInCredentialsDto } from './sign-in.dto';
import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class SignUpCredentialsDto extends SignInCredentialsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  // @IsNotEmpty()
  // @IsDate()
  // @Type(() => Date)
  // dob: Date;

  @IsNotEmpty()
  @IsString()
  password: string;
}
