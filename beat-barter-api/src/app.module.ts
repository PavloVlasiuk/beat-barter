import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';

@Module({
  imports: [DatabaseModule, UsersModule, RefreshTokensModule],
})
export class AppModule {}
