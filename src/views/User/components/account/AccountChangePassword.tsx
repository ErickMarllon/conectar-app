// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '@/components/iconify';
import FormProvider, { RHFTextField } from '@/components/hook-form';
import { toast } from 'react-toastify';
import { ChangePasswordSchema, type IChangePassword } from '@/schemas/change-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserPathPassword } from '@/queries/user/pathPassword/useUserPathPassword';
import { useState } from 'react';
import { useAuthStore } from '@/stores/userAuth.store';
import { UserRole } from '@/shared/enums';

// ----------------------------------------------------------------------

type FormValuesProps = IChangePassword;

type Props = {
  user_id?: string;
};
export default function AccountChangePassword({ user_id }: Props) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user } = useAuthStore();
  const { mutate, isPending, reset } = useUserPathPassword();

  const defaultValues = {
    user_id,
  };

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(ChangePasswordSchema(user?.role as UserRole)),
    defaultValues,
  });

  const { handleSubmit, trigger } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    if (!user_id) return;
    mutate(
      { ...data, user_id },
      {
        onSuccess: () => {
          toast.success('Update success');
          reset();
        },
        onError: () => {
          toast.error('Update failed');
        },
      },
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Stack spacing={3} alignItems="flex-end" sx={{ p: 3 }}>
          <RHFTextField
            name="old_password"
            label="Old Password"
            type={showOldPassword ? 'text' : 'password'}
            onBlur={() => trigger('old_password')}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowOldPassword(!showOldPassword)} edge="end">
                      <Iconify icon={showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <RHFTextField
            name="new_password"
            label="New Password"
            onBlur={() => trigger('new_password')}
            helperText={
              <Stack component="span" direction="row" alignItems="center">
                <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be
                minimum 6+
              </Stack>
            }
            type={showNewPassword ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                      <Iconify icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <RHFTextField
            name="confirm_new_password"
            label="Confirm New Password"
            onBlur={() => trigger('confirm_new_password')}
            type={showConfirmPassword ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <LoadingButton type="submit" variant="contained" loading={isPending}>
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
