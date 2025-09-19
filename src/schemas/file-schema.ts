import { z } from 'zod';
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const customFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    '.jpg, .jpeg, .png and .webp files are accepted.',
  );

export type ICustomFile = z.infer<typeof customFileSchema>;

export const AvatarSchema = z.union([
  z.string(),
  z.string().url().optional(),
  customFileSchema,
  z.undefined(),
]);
