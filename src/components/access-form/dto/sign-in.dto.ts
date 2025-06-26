import type { z } from 'zod';
import type { signInSchema } from '../schemas/sign-in.schema';

export type ISignInDto = z.infer<typeof signInSchema>;
