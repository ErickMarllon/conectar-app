import { z } from 'zod';
import type { CustomFile } from '@/components/upload';

export const NewProductSchema = z.object({
  name: z.string().nonempty('Name is required'),
  images: z
    .array(z.union([z.custom<CustomFile | string>(), z.string()]))
    .min(1, 'Images is required'),
  tags: z.array(z.any()).min(2, 'Must have at least 2 tags'),
  price: z.number().gt(0, 'Price should not be $0.00'),
  description: z.string().nonempty('Description is required'),
  inStock: z.boolean().default(true).optional(),
  taxes: z.boolean().default(true).optional(),
  code: z.string().nonempty('Code is required'),
  sku: z.string().nonempty('Sku is required'),
  priceSale: z.number().gt(0, 'Price Sale should not be $0.00'),
  gender: z.string().nonempty('Gender is required'),
  category: z.string().nonempty('Category is required'),
});

export type INewProduct = z.infer<typeof NewProductSchema>;
