import { z } from 'zod';

export const ReviewSchema = z.object({
  rating: z.any().refine((val) => val !== undefined && val !== null, {
    message: 'Rating is required',
  }),
  review: z.string().min(1, { message: 'Review is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Email must be a valid email address'),
});

export type ReviewFormValues = z.infer<typeof ReviewSchema>;
