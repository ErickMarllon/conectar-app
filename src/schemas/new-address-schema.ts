import { z } from 'zod';

export const NewAddressSchema = z.object({
  receiver: z.string().nonempty('Fullname is required'),
  addressType: z.string().nonempty('addressType is required'),
  phone_number: z.string().nonempty('Phone number is required'),
  address: z.string().nonempty('Address is required'),
  city: z.string().nonempty('City is required'),
  state: z.string().nonempty('State is required'),
  country: z.string().nonempty('Country is required'),
  zip_code: z.string().nonempty('Zip code is required'),
  isDefault: z.boolean(),
});
