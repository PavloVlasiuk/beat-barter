import { registerAs } from '@nestjs/config';

export default registerAs(
  'auth',
  (): Record<string, any> => ({
    jwt: {
      secret: process.env.JWT_SECRET ?? 'strongSecret',
      accessExpiresIn: process.env.JWT_TTL ?? '1h',
      refreshExpiresIn: process.env.JWT_REFRESH_TTL ?? '7d',
    },
  }),
);
