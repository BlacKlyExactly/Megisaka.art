import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const sendCommissionSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required').email('Email is incorrect'),
  artType: z.string().min(1, 'Required'),
  files: z.custom<FileList>(),
  description: z.string().min(1, 'Required'),
});

export const sendCommissionSchemaFd = zfd.formData({
  name: zfd.text(z.string().min(1, 'Required')),
  email: zfd.text(z.string().min(1, 'Required').email('Email is incorrect')),
  artType: zfd.text(z.string().min(1, 'Required')),
  files: zfd.json(z.any()),
  description: zfd.text(z.string().min(1, 'Required')),
});

export type SendCommissionValues = z.infer<typeof sendCommissionSchema>;
