import { z } from 'zod';

export const userSocialSchema = z.object({
  user_id: z.string().optional(),
  tenant_id: z.string().optional(),
  provider_facebook: z.string().optional(),
  provider_instagram: z.string().optional(),
  provider_linkedin: z.string().optional(),
  provider_twitter: z.string().optional(),
});

export type IUserSocialSchema = z.infer<typeof userSocialSchema>;
