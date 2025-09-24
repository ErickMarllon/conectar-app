import { z } from 'zod';
import { addressSchema } from './address-schema';

export const addressPayloadSchema = z.object({
  user_id: z.string().optional(),
  tenant_id: z.string().optional(),
  address: addressSchema,
});

export type IAddressPayloadSchema = z.infer<typeof addressPayloadSchema>;
