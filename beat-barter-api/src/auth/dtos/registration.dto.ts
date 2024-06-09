import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { PASSWORD_REGEX, USERNAME_REGEX } from '../auth.constants';

export class RegistrationDto {
  @IsString()
  @Matches(USERNAME_REGEX, {
    message:
      "Username must contain from 2 to 30 characters, include only latin letters, numbers and '_-' characters",
  })
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain from 8 to 32 characters, include at least 1 letter and 1 number',
  })
  @IsNotEmpty()
  password: string;
}
