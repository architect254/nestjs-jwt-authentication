import { SignInCredentialsDto } from './sign-in.dto';
import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';

export class SignUpCredentialsDto extends SignInCredentialsDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  //@IsDate()
  dob: Date;
}
