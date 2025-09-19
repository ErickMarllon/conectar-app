import { RHFTextField } from '@/components/hook-form';
import { Grid } from '@mui/material';

type IAddressForm = {
  onFocus?: VoidFunction;
  onBlur?: VoidFunction;
};

export function AddressForm({ onFocus, onBlur }: IAddressForm) {
  return (
    <Grid
      gap={2}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
      }}
    >
      <RHFTextField
        name="address.zip_code"
        label="Zip/Code"
        onFocus={onFocus}
        onBlur={onBlur}
        slotProps={{
          input: {
            inputProps: {
              maxLength: 10,
            },
          },
        }}
      />
      <RHFTextField name="address.neighborhood" label="Neighborhood" />
      <RHFTextField name="address.street" label="Street" />
      <RHFTextField name="address.street_number" label="Street Number" />
      <RHFTextField name="address.state" label="State/Region" />
      <RHFTextField name="address.city" label="City" />
      <RHFTextField name="address.complement" label="Complement" />
    </Grid>
  );
}
