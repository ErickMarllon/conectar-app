import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack, IconButton, InputAdornment, Button } from '@mui/material';
// auth
// components
import Iconify from '@/components/iconify';
import FormProvider, { RHFTextField } from '@/components/hook-form';
import { signUpSchema } from '@/schemas/sign-up.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useAuthUser } from '@/queries/useAuth/useAuth';
import { AuthActionType } from '@/queries/useAuth/types/IUseAuthTypes';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

type FormValuesProps = z.infer<typeof signUpSchema>;

export default function AuthRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useAuthUser({ type: AuthActionType.SIGNUP });
  const { slug: tenant } = useParams<{ slug: string }>();
  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { tenant },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormValuesProps) => mutate(data);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {/* {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>} */}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="first_name" label="First name" />
          <RHFTextField name="last_name" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

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

        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isPending}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Create account
        </Button>
      </Stack>
    </FormProvider>
  );
}
