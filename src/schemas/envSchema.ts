import { z } from 'zod';

export const envSchema = z.object({
  SANITY_TOKEN: z.string(),
  SANITY_PROJECTID: z.string(),
  MAILGUN_API_KEY: z.string(),
  ARTIST_MAIL: z.string(),
  KV_URL: z.string(),
  KV_REST_API_URL: z.string(),
  KV_REST_API_TOKEN: z.string(),
  KV_REST_API_READ_ONLY_TOKEN: z.string(),
  RESEND_API_KEY: z.string(),
});

type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}
