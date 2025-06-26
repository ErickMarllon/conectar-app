import { UserRole } from '@/shared/constants/enums';
import { z } from 'zod';

export const schema = z.object({
  id: z.string().uuid('ID inválido'),
  email: z.string().email('Email inválido'),
  first_name: z.string().min(1, 'Nome é obrigatório'),
  picture: z.string().url('URL inválida').optional(),
  last_name: z.string(),
  role: z.nativeEnum(UserRole).optional(),
  last_login_at: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  deleted_at: z.string().optional(),
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
    })
    .optional(),
});
