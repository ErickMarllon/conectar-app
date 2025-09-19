import { z } from 'zod';

export const InvoiceAddressSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  company: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export const InvoiceItemSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
  service: z.string(),
});

export const NewInvoiceSchema = z.object({
  id: z.string().optional(),
  sent: z.number().optional(),
  status: z.string(),
  totalPrice: z.number(),
  invoiceNumber: z.string(),
  subTotalPrice: z.number(),
  taxes: z.union([z.number(), z.string()]).optional(),
  discount: z.union([z.number(), z.string()]).optional(),
  invoiceFrom: InvoiceAddressSchema,
  invoiceTo: InvoiceAddressSchema.optional(),
  createDate: z.date().optional(),
  dueDate: z.date().optional(),
  items: z.array(InvoiceItemSchema),
});

export type INewInvoice = z.infer<typeof NewInvoiceSchema>;
export type InvoiceAddress = z.infer<typeof InvoiceAddressSchema>;
export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;
