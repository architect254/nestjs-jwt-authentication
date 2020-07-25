import { IsString, IsNotEmpty } from 'class-validator';

export class SignInCredentialsDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  password: string;
}
