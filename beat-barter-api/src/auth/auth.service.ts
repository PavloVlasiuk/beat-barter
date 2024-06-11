import { UsersService } from '../users/users.service';
import { RegistrationDto, UpdatePasswordDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IAccessToken, IJwtPayload, IJwtTokens } from './interfaces';
import { EmailTokensService } from 'src/email-tokens/email-tokens.service';
import { State, TokenAssignment, User } from '@prisma/client';
import { RefreshTokensService } from 'src/refresh-tokens/refresh-tokens.service';
import { MailService } from 'src/mail/mail.service';
import { HOUR } from './auth.constants';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AlreadyRegisteredException,
  IdenticalPasswordException,
  InvalidEmailTokenException,
} from './exceptions';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtAccessExpiresIn: string;
  private readonly jwtRefreshExpiresIn: string;
  private readonly frontUrl: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly emailTokensService: EmailTokensService,
    private readonly refreshTokensService: RefreshTokensService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('auth.jwt.secret');

    this.jwtAccessExpiresIn = this.configService.get<string>(
      'auth.jwt.accessExpiresIn',
    );

    this.jwtRefreshExpiresIn = this.configService.get<string>(
      'auth.jwt.refreshExpiresIn',
    );

    this.frontUrl = this.configService.get<string>('app.frontUrl');
  }

  async validateUser(username: string, password: string) {
    const userExists = await this.usersService.find({ username });

    if (!userExists) {
      throw new NotFoundException('User with such username is not found');
    }

    const matchPassword = await this.checkPassword(
      password,
      userExists.password,
    );

    if (!matchPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    delete userExists.password;

    return userExists;
  }

  async register({
    username,
    email,
    password,
  }: RegistrationDto): Promise<void> {
    if (await this.isRegistered(email, username)) {
      throw new AlreadyRegisteredException();
    }

    const hash = await this.hashPassword(password);

    const data = { username, email, password: hash };

    await this.usersService.create(data);

    await this.requestEmailVerification(email);
  }

  async verify(emailToken: string): Promise<IJwtTokens> {
    const { token, email } = await this.emailTokensService.find({
      token: emailToken,
    });

    if (!token) {
      throw new InvalidEmailTokenException();
    }

    const user = await this.usersService.update(
      { email },
      {
        state: State.APPROVED,
      },
    );

    await this.emailTokensService.delete(emailToken);

    const jwtTokens = this.getTokens(user);

    await this.refreshTokensService.create({
      userId: user.id,
      token: jwtTokens.refreshToken,
    });

    return jwtTokens;
  }

  async login(user: User): Promise<IJwtTokens> {
    if (user.state !== State.APPROVED) {
      throw new UnauthorizedException('Email address is not verified yet');
    }

    const tokens = this.getTokens(user);

    await this.refreshTokensService.updateByUserId(user.id, {
      token: tokens.refreshToken,
    });

    return tokens;
  }

  async getMe(id: string): Promise<User> {
    const user = await this.usersService.find({ id });

    delete user.password;

    return user;
  }

  async refresh(user: User, refreshToken: string): Promise<IAccessToken> {
    const { token } = await this.refreshTokensService.findByUserId(user.id);

    if (!token) {
      throw new UnauthorizedException();
    }

    if (refreshToken !== token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.getAccessToken(user);
  }

  async forgotPassword(email: string): Promise<void> {
    const isRegistered = await this.isRegistered(email);

    if (!isRegistered) {
      throw new NotFoundException('User with such email is not found');
    }

    const emailToken = await this.createEmailToken(
      email,
      TokenAssignment.RESETTING,
    );

    await this.mailService.sendTemplatedEmail({
      to: email,
      subject: 'Request to change password',
      message:
        'To change your password follow link below. It is valid during an hour.',
      link: `${this.frontUrl}/verify/${emailToken}`,
    });
  }

  async resetPassword(emailToken: string, password: string): Promise<void> {
    const { token, email } = await this.emailTokensService.find({
      token: emailToken,
    });

    if (!token) {
      throw new InvalidEmailTokenException();
    }

    const hash = await this.hashPassword(password);

    await this.usersService.update({ email }, { password: hash });

    await this.emailTokensService.delete(token);
  }

  async updatePassword(
    { oldOne, newOne }: UpdatePasswordDto,
    user: User,
  ): Promise<IJwtTokens> {
    await this.validateUser(user.username, oldOne);

    if (oldOne === newOne) {
      throw new IdenticalPasswordException();
    }

    const hash = await this.hashPassword(newOne);

    const updatedUser = await this.usersService.update(
      { id: user.id },
      { password: hash },
    );

    const tokens = this.getTokens(updatedUser);

    await this.refreshTokensService.updateByUserId(updatedUser.id, {
      token: tokens.refreshToken,
    });

    return tokens;
  }

  private async isRegistered(email = '', username = ''): Promise<boolean> {
    const user = await this.usersService.find({
      OR: [{ username }, { email }],
    });

    if (user && user.state === State.PENDING) {
      return false;
    }

    return !!user;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    return bcrypt.hash(password, salt);
  }

  private getAccessToken(user: User): IAccessToken {
    const payload = this.createPayload(user);

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.jwtAccessExpiresIn,
      secret: this.jwtSecret,
    });

    return { accessToken };
  }

  private getTokens(user: User): IJwtTokens {
    const payload = this.createPayload(user);

    const secret = this.jwtSecret;

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.jwtAccessExpiresIn,
      secret,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.jwtRefreshExpiresIn,
      secret,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async checkPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private createPayload(user: User): IJwtPayload {
    return {
      sub: user.id,
      email: user.email,
    };
  }

  private async requestEmailVerification(email: string): Promise<void> {
    const token = await this.createEmailToken(
      email,
      TokenAssignment.VERIFICATION,
    );

    await this.mailService.sendTemplatedEmail({
      to: email,
      subject: 'Email verification on "Beat Barter"',
      message:
        'To verify your email follow link below. It is valid during a hour.',
      link: `${this.frontUrl}/verify/${token}`,
    });
  }

  private async createEmailToken(
    email: string,
    tokenAssignment: TokenAssignment,
  ): Promise<string> {
    await this.deleteIfTokenAlreadyExists(email, tokenAssignment);

    const { token } = await this.emailTokensService.create({
      email,
      tokenAssignment,
    });

    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.emailTokensService.delete(token));
      }, HOUR);
    });

    return token;
  }

  private async deleteIfTokenAlreadyExists(
    email: string,
    tokenAssignment: TokenAssignment,
  ): Promise<void> {
    const tokenExists = await this.emailTokensService.find({
      email,
      tokenAssignment,
    });

    if (tokenExists) {
      await this.emailTokensService.delete(tokenExists.token);
    }
  }
}
