import { z } from 'zod';
import { AvatarSchema } from './file-schema';
import { addressSchema } from './address-schema';

export const tenantSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'name is required'),
  slug: z.string().min(3, 'slug is required'),
  email: z.string().email('Email is required'),
  phone_number: z.string(),
  whatsapp: z.string(),
  logo: AvatarSchema.optional(),
  cover: AvatarSchema.optional(),
  status: z.string().optional(),
  address: addressSchema.optional(),
  about: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export const tenantSchemaWithAddress = tenantSchema.extend({
  address: addressSchema,
});

export type ITenantSchema = z.infer<typeof tenantSchema>;
export type ITenantSchemaWithAddress = z.infer<typeof tenantSchemaWithAddress>;
