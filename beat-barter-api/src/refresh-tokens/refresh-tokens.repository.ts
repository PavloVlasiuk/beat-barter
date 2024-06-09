import { Injectable } from '@nestjs/common';
import { Prisma, RefreshToken } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RefreshTokensRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.RefreshTokenUncheckedCreateInput,
  ): Promise<RefreshToken> {
    return this.prisma.refreshToken.create({
      data,
    });
  }

  async find(where: Prisma.RefreshTokenWhereInput): Promise<RefreshToken> {
    return this.prisma.refreshToken.findFirst({ where });
  }

  async update(
    where: Prisma.RefreshTokenWhereUniqueInput,
    token: string,
  ): Promise<RefreshToken> {
    return this.prisma.refreshToken.update({
      data: {
        token,
      },
      where,
    });
  }
}
