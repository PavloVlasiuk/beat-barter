import { registerAs } from '@nestjs/config';

export default registerAs(
  'email',
  (): Record<string, any> => ({
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: '"BEAT BARTER" <noreply@beat-barter.com>',
  }),
);
