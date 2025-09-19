import { z } from 'zod';

export const verificationCodeSchema = z.object({
  code1: z.string().min(1, 'Required'),
  code2: z.string().min(1, 'Required'),
  code3: z.string().min(1, 'Required'),
  code4: z.string().min(1, 'Required'),
  code5: z.string().min(1, 'Required'),
  code6: z.string().min(1, 'Required'),
});
