import { z } from 'zod';
import { AvatarSchema } from './file-schema';
import { addressSchema } from './address-schema';

export const userSchema = z.object({
  id: z.string().optional(),
  first_name: z.string().min(3, 'first name is required'),
  last_name: z.string().min(3, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  phone_number: z.string(),
  avatar: AvatarSchema.optional(),
  is_verified: z.boolean().optional(),
  status: z.string().optional(),
  role: z.string().optional(),
  address: addressSchema.optional(),
  about: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export const userSchemaWithAddress = userSchema.extend({
  address: addressSchema,
});

export type IUserSchema = z.infer<typeof userSchema>;
export type IUserSchemaWithAddress = z.infer<typeof userSchemaWithAddress>;
