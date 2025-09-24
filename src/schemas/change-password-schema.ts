import { UserRole } from '@/shared/enums';
import { z } from 'zod';

export const ChangePasswordSchema = (role?: UserRole) =>
  z
    .object({
      user_id: z.string(),
      old_password:
        role === UserRole.USER
          ? z.string().nonempty('Old Password is required')
          : z.string().optional(),
      new_password: z
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
        .refine((val) => /[@$!%*?&.]/.test(val), {
          message: 'One special character required',
        }),
      confirm_new_password: z.string().nonempty('Please confirm your new password'),
    })
    .refine((data) => data.new_password === data.confirm_new_password, {
      message: 'Passwords must match',
      path: ['confirm_new_password'],
    });

export type IChangePassword = z.infer<ReturnType<typeof ChangePasswordSchema>>;
