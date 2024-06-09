import { TokenAssignment } from '@prisma/client';

export class CreateEmailTokenDto {
  email: string;
  tokenAssignment: TokenAssignment;
}
