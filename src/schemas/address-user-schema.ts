import { z } from 'zod';
import { addressSchema } from './address-schema';

export const addressUserSchema = z.object({
  user_id: z.string().optional(),
  address: addressSchema,
});

export type IUserAddress = z.infer<typeof addressUserSchema>;
