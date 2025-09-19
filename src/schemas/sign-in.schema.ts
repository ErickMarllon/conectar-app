import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Email inválido'),
  tenant: z.string().optional(),
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
});
export type ISignIn = z.infer<typeof signInSchema>;
