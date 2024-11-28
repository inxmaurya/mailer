import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

export const emailConfig = {
  service: process.env.EMAIL_SERVICE,
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
};
