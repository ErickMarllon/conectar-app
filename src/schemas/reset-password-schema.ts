import { z } from 'zod';
import { verificationCodeSchema } from './verification-code-schema';
export const resetPasswordSchema = verificationCodeSchema
  .extend({
    email: z.string(),
    password: z
      .string()
      .min(6, 'At least 6 characters')
      .refine((val) => /[a-z]/.test(val), {
        message: 'One lowercase letter required',
      })
      .refine((val) => /[A-Z]/.test(val), {
        message: 'One uppercase letter required',
      })
      .refine((val) => /\d/.test(val), {
        message: 'One number required',
      })
      .refine((val) => /[@$!%*?&]/.test(val), {
        message: 'One special character required',
      }),
    confirmPassword: z.string().min(6, 'At least 6 characters'),
  })
  .partial()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword && password && confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });
