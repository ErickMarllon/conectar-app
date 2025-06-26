import { z } from 'zod';
import { signInSchema } from './sign-in.schema';

export const signUpSchema = signInSchema.extend({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
});
