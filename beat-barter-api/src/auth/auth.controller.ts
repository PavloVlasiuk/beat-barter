import {
  Body,
  Controller,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { IAccessToken, IJwtTokens } from './interfaces';
import { User } from '@prisma/client';
import { JwtGuard, LocalAuthGuard } from './guards';
import {
  ForgotPasswordDto,
  RegistrationDto,
  ResetPasswordDto,
  UpdatePasswordDto,
} from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegistrationDto): Promise<void> {
    return await this.authService.register(body);
  }

  @Post('verify/:token')
  async verify(@Param('token') token: string): Promise<IJwtTokens> {
    return await this.authService.verify(token);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<IJwtTokens> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Post('refresh')
  async refresh(@Request() req): Promise<IAccessToken> {
    const refreshToken = req.headers.authorization.split(' ')[1];

    return this.authService.refresh(req.user, refreshToken);
  }

  @UseGuards(JwtGuard)
  @Post('updatePassword')
  async updatePassword(
    @Body() body: UpdatePasswordDto,
    @Request() req,
  ): Promise<IJwtTokens> {
    return this.authService.updatePassword(body, req.user.id);
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() body: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(body.email);
  }

  @Post('resetPassword/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() body: ResetPasswordDto,
  ): Promise<void> {
    return this.authService.resetPassword(token, body.password);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getProfile(@Request() req): Promise<User> {
    return this.authService.getMe(req.user.id);
  }
}
