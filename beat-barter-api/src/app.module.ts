import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { RefreshTokensModule } from './refresh-tokens/refresh-tokens.module';
import { EmailTokensModule } from './email-tokens/email-tokens.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configs from './configs';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    RefreshTokensModule,
    EmailTokensModule,
    MailModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: configs,
    }),
  ],
})
export class AppModule {}
