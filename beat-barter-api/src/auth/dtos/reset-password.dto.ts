import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { PASSWORD_REGEX } from '../auth.constants';

export class ResetPasswordDto {
  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain from 8 to 32 characters, include at least 1 letter and 1 number',
  })
  @IsNotEmpty()
  password: string;
}
