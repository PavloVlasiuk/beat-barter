import { Module } from '@nestjs/common';
import { EmailTokensService } from './email-tokens.service';
import { EmailTokensRepository } from './email-tokens.repository';

@Module({
  providers: [EmailTokensService, EmailTokensRepository],
  exports: [EmailTokensService],
})
export class EmailTokensModule {}
