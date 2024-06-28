import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const sendMessageSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required').email('Email is incorrect'),
  description: z.string().min(1, 'Required'),
  bkuXk05: z.string().optional(), //Honeypot
});

export const sendMessageSchemaFd = zfd.formData({
  name: zfd.text(z.string().min(1, 'Required')),
  email: zfd.text(z.string().min(1, 'Required').email('Email is incorrect')),
  description: zfd.text(z.string().min(1, 'Required')),
  bkuXk05: zfd.text(z.string().optional()), //Honeypot
});

export type SendMessageValues = z.infer<typeof sendMessageSchema>;
