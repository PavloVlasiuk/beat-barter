import { State } from '@prisma/client';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  state?: State;
}
