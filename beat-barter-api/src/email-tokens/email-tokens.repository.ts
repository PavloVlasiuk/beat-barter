import { Injectable } from '@nestjs/common';
import { EmailToken, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EmailTokensRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EmailTokenCreateInput): Promise<EmailToken> {
    return this.prisma.emailToken.create({ data });
  }

  async find(where: Prisma.EmailTokenWhereInput): Promise<EmailToken | null> {
    return this.prisma.emailToken.findFirst({ where });
  }

  async delete(where: Prisma.EmailTokenWhereUniqueInput): Promise<EmailToken> {
    return this.prisma.emailToken.delete({ where });
  }
}
