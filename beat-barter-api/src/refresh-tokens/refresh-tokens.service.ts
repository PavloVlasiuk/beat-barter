import { Injectable } from '@nestjs/common';
import { RefreshTokensRepository } from './refresh-tokens.repository';
import { CreateRefreshTokenDto, UpdateRefreshTokenDto } from './dto';
import { RefreshToken } from '@prisma/client';

@Injectable()
export class RefreshTokensService {
  constructor(
    private readonly refreshTokensRepository: RefreshTokensRepository,
  ) {}

  async create(data: CreateRefreshTokenDto): Promise<RefreshToken> {
    return this.refreshTokensRepository.create(data);
  }

  async findByUserId(userId: string): Promise<RefreshToken | null> {
    return this.refreshTokensRepository.find({ userId });
  }

  async updateByUserId(userId: string, updateData: UpdateRefreshTokenDto) {
    return this.refreshTokensRepository.update({ userId }, updateData.token);
  }
}
