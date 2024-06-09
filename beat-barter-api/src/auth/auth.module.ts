import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtGuard, LocalAuthGuard } from './guards';
import { JwtStrategy, LocalStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { EmailTokensModule } from 'src/email-tokens/email-tokens.module';
import { RefreshTokensModule } from 'src/refresh-tokens/refresh-tokens.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    UsersModule,
    EmailTokensModule,
    RefreshTokensModule,
    MailModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtGuard,
  ],
  exports: [JwtStrategy, JwtGuard],
})
export class AuthModule {}
