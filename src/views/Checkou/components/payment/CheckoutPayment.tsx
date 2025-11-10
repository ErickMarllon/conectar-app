import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import type {
  ICheckoutCardOption,
  ICheckoutDeliveryOption,
  ICheckoutPaymentOption,
  IProductCheckoutState,
} from '@/shared/interfaces/IProduct';
import type { z } from 'zod';
import CheckoutSummary from '../CheckoutSummary';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import FormProvider from '@/components/hook-form';
import Iconify from '@/components/iconify';
import { PaymentSchema } from '@/schemas/payment-schema';

const DELIVERY_OPTIONS: ICheckoutDeliveryOption[] = [
  {
    value: 0,
    title: 'Standard delivery (Free)',
    description: 'Delivered on Monday, August 12',
  },
  {
    value: 2,
    title: 'Fast delivery ($2,00)',
    description: 'Delivered on Monday, August 5',
  },
];

const PAYMENT_OPTIONS: ICheckoutPaymentOption[] = [
  {
    value: 'paypal',
    title: 'Pay with Paypal',
    description: 'You will be redirected to PayPal website to complete your purchase securely.',
    icons: ['/assets/icons/payments/ic_paypal.svg'],
  },
  {
    value: 'credit_card',
    title: 'Credit / Debit Card',
    description: 'We support Mastercard, Visa, Discover and Stripe.',
    icons: ['/assets/icons/payments/ic_mastercard.svg', '/assets/icons/payments/ic_visa.svg'],
  },
  {
    value: 'cash',
    title: 'Cash on CheckoutDelivery',
    description: 'Pay with cash when your order is delivered.',
    icons: [],
  },
];

const CARDS_OPTIONS: ICheckoutCardOption[] = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];

type Props = {
  checkout: IProductCheckoutState;
  onNextStep: VoidFunction;
  onBackStep: VoidFunction;
  onReset: VoidFunction;
  onGotoStep: (step: number) => void;
  onApplyShipping: (value: number) => void;
};

export type FormValuesProps = z.infer<typeof PaymentSchema>;

export default function CheckoutPayment({
  checkout,
  onReset,
  onNextStep,
  onBackStep,
  onGotoStep,
  onApplyShipping,
}: Props) {
  const { total, discount, subtotal, shipping, billing } = checkout;

  const defaultValues = {
    delivery: shipping,
    payment: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      onNextStep();
      onReset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <CheckoutDelivery onApplyShipping={onApplyShipping} deliveryOptions={DELIVERY_OPTIONS} />

          <CheckoutPaymentMethods
            cardOptions={CARDS_OPTIONS}
            paymentOptions={PAYMENT_OPTIONS}
            sx={{ my: 3 }}
          />

          <Button
            size="small"
            color="inherit"
            onClick={onBackStep}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Back
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CheckoutBillingInfo onBackStep={onBackStep} billing={billing} />

          <CheckoutSummary
            enableEdit
            total={total}
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            onEdit={() => onGotoStep(0)}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Complete Order
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
