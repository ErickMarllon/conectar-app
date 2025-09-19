import { z } from 'zod';

export const PaymentSchema = z.object({
  payment: z.string().nonempty('Payment is required!'),
});
