import { HttpException, HttpStatus } from '@nestjs/common';

export class IdenticalPasswordException extends HttpException {
  constructor() {
    super('New and old passwords are identical', HttpStatus.BAD_REQUEST);
  }
}
