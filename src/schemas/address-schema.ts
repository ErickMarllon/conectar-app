import { z } from 'zod';

export const addressSchema = z.object({
  id: z.string().optional(),
  zip_code: z.string(),
  street: z.string(),
  street_number: z.string(),
  neighborhood: z.string(),
  complement: z.string().optional(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  is_default: z.boolean(),
});

export type IAddressSchema = z.infer<typeof addressSchema>;
