import { IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { RHFTextField } from '@/components/hook-form';
import Iconify from '@/components/iconify';

export default function PaymentBillingAddress() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Typography variant="h6">Billing Address</Typography>

      <Stack spacing={3} mt={5}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="first_name" label="First name" />
          <RHFTextField name="last_name" label="Last name" />
        </Stack>
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <RHFTextField name="phone_number" label="Phone number" />
        <RHFTextField name="email" label="Email" />
        <RHFTextField name="company_name" label="Company name" />
      </Stack>
    </div>
  );
}

// Client ID= AW4esy0HIgXkarY2nwYn1T2aS9QjwhcaanNf8VrdY_cjgMAQTP1rKVF_wGrOpcEgTTan0yvWtENaAuSl
// Secret key 1= EMYlRcrj-dAZrWuEVCFEBF4iWemOeuEuowSe2jGQqBdM8IIZX8o-fufVVg9ycHxkQeRmnBrmAzCgcNHH
