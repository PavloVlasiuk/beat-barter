import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    port: process.env.PORT ? Number.parseInt(process.env.PORT) : 3000,
    host: process.env.HOST ?? 'localhost',
    globalPrefix: '/api',
    frontUrl: process.env.FRONT_BASE_URL ?? 'http://localhost:3001',
  }),
);
