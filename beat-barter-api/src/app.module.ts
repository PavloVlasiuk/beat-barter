import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';
import { EmailTokensModule } from './email-tokens/email-tokens.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    RefreshTokensModule,
    EmailTokensModule,
  ],
})
export class AppModule {}
