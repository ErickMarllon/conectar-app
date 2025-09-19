import { useState } from 'react';
// react router dom
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack, IconButton, InputAdornment, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';
// components
import Iconify from '@/components/iconify';
import FormProvider, { RHFTextField, RHFCodes } from '@/components/hook-form';
import { resetPasswordSchema } from '@/schemas/reset-password-schema';
import type { z } from 'zod';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';

// ----------------------------------------------------------------------
export type FormValuesProps = z.infer<typeof resetPasswordSchema>;

export default function AuthNewPasswordForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const emailRecovery =
    typeof window !== 'undefined' ? sessionStorage.getItem('email-recovery') : '';

  const methods = useForm<FormValuesProps>({
    mode: 'onChange',
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: resetPasswordSchema.parse({
      email: emailRecovery || '',
    }),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('DATA:', {
        email: data.email,
        code: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
        password: data.password,
      });

      sessionStorage.removeItem('email-recovery');

      toast.success('Change password success!');

      navigate(PATH_DASHBOARD.root, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField
          name="email"
          label="Email"
          disabled={!!emailRecovery}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <RHFCodes keyName="code" inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']} />

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5 ||
          !!errors.code6) && (
          <FormHelperText error sx={{ px: 2 }}>
            Code is required
          </FormHelperText>
        )}

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

        <RHFTextField
          name="confirmPassword"
          label="Confirm New Password"
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

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Update Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
