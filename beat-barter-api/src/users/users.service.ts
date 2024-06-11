import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './users.repository';
import { Prisma, State, User } from '@prisma/client';
import { AlreadyExistsException } from './exceptions/already-exists.exception';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data: CreateUserDto): Promise<User> {
    const userExists = await this.usersRepository.find({
      OR: [{ username: data.username }, { email: data.email }],
    });

    if (userExists && userExists.state === State.PENDING) {
      return this.usersRepository.update({ id: userExists.id }, data);
    }

    if (userExists) {
      throw new AlreadyExistsException();
    }

    return this.usersRepository.create(data);
  }

  async find(where: Prisma.UserWhereInput): Promise<User | null> {
    return this.usersRepository.find(where);
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    updateData: UpdateUserDto,
  ): Promise<User> {
    const user = await this.find(where);

    if (!user) {
      throw new NotFoundException('User with such credentials does not exist');
    }

    return this.usersRepository.update(where, updateData);
  }
}
