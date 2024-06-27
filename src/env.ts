import * as dotenv from 'dotenv';
import { envSchema } from './schemas/envSchema';

dotenv.config();

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(env.error.issues);
  throw new Error('Missing env variables');
}

export default env.data;
