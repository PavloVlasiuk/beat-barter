import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmailTokenDto } from './dto';
import { EmailTokensRepository } from './email-tokens.repository';
import { EmailToken } from '@prisma/client';

@Injectable()
export class EmailTokensService {
  constructor(private readonly emailTokensRepository: EmailTokensRepository) {}

  async create(data: CreateEmailTokenDto): Promise<EmailToken> {
    return this.emailTokensRepository.create({
      tokenAssignment: data.tokenAssignment,
      user: {
        connect: {
          email: data.email,
        },
      },
    });
  }

  async find(token: string): Promise<EmailToken | null> {
    return this.emailTokensRepository.find({ token });
  }

  async delete(token: string): Promise<EmailToken> {
    const tokenExists = await this.find(token);

    if (!tokenExists) {
      throw new NotFoundException('Email token is not found');
    }

    return this.emailTokensRepository.delete({ token });
  }
}
