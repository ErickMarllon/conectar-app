// form
import { useForm } from 'react-hook-form';
// @mui
import {
  Box,
  Stack,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @types
import type { ICheckoutBillingAddress } from '@/shared/interfaces/IProduct';
// assets
import { countries } from '@/assets/data';
import FormProvider, {
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
} from '@/components/hook-form';
import { NewAddressSchema } from '@/schemas/new-address-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

// ----------------------------------------------------------------------

export type FormValuesProps = z.infer<typeof NewAddressSchema>;

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onCreateBilling: (address: ICheckoutBillingAddress) => void;
};

export default function CheckoutBillingNewAddressForm({ open, onClose, onCreateBilling }: Props) {
  const defaultValues = {
    addressType: 'Home',
    receiver: '',
    phone_number: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    isDefault: true,
  };

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      onCreateBilling({
        receiver: data.receiver,
        phone_number: data.phone_number,
        fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zip_code}`,
        addressType: data.addressType,
        isDefault: data.isDefault,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add new address</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            <RHFRadioGroup
              row
              name="addressType"
              options={[
                { label: 'Home', value: 'Home' },
                { label: 'Office', value: 'Office' },
              ]}
            />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="receiver" label="Full Name" />

              <RHFTextField name="phone_number" label="Phone Number" />
            </Box>

            <RHFTextField name="address" label="Address" />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="city" label="Town / City" />

              <RHFTextField name="state" label="State" />

              <RHFTextField name="zip_code" label="Zip/Code" />
            </Box>

            <RHFSelect native name="country" label="Country">
              <option value="" />
              {countries.map((country) => (
                <option key={country.code} value={country.label}>
                  {country.label}
                </option>
              ))}
            </RHFSelect>

            <RHFCheckbox name="isDefault" label="Use this address as default." sx={{ mt: 3 }} />
          </Stack>
        </DialogContent>

        <DialogActions>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Deliver to this Address
          </LoadingButton>

          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
