import { useEffect, useState } from 'react';
// react router dom
import { Link as RouterLink, useParams } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
// @mui
import { Link, Stack, IconButton, InputAdornment, Button, Alert } from '@mui/material';
// routes
import { PATH_AUTH } from '@/routes/paths';
// components
import Iconify from '@/components/iconify';
import FormProvider, { RHFTextField } from '@/components/hook-form';
import { signInSchema } from '@/schemas/sign-in.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useAuthUser } from '@/queries/useAuth/useAuth';
import { AuthActionType } from '@/queries/useAuth/types/IUseAuthTypes';

// ----------------------------------------------------------------------

type FormValuesProps = z.infer<typeof signInSchema>;

export default function AuthLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, error: submitError, isPending } = useAuthUser({ type: AuthActionType.SIGNIN });
  const { slug: tenant } = useParams<{ slug: string }>();

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(signInSchema),
    defaultValues: { tenant },
  });

  const {
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormValuesProps) => mutate(data);

  useEffect(() => {
    if (submitError) {
      setError('root', {
        ...submitError,
        message: submitError.message,
      });
    }
  }, [errors, setError, submitError]);

  return (
    <FormProvider methods={methods} key={tenant ?? 'new'} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.root && <Alert severity="error">{errors.root.message}</Alert>}

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
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to={PATH_AUTH.resetPassword}
          variant="body2"
          color="inherit"
          underline="always"
        >
          Forgot password?
        </Link>
      </Stack>

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
        Login
      </Button>
    </FormProvider>
  );
}
