import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { PASSWORD_REGEX } from '../auth.constants';

export class UpdatePasswordDto {
  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain from 8 to 32 characters, include at least 1 letter and 1 number',
  })
  @IsNotEmpty()
  oldOne: string;

  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain from 8 to 32 characters, include at least 1 letter and 1 number',
  })
  @IsNotEmpty()
  newOne: string;
}
