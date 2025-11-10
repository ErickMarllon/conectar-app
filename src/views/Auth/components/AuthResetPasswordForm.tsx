import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { z } from 'zod';
import FormProvider, { RHFTextField } from '@/components/hook-form';
import { PATH_AUTH } from '@/routes/paths';
import { emailSchema } from '@/schemas/email-schema';

type FormValuesProps = z.infer<typeof emailSchema>;

export default function AuthResetPasswordForm() {
  const navigate = useNavigate();

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(emailSchema),
    defaultValues: emailSchema.partial().parse({}),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      sessionStorage.setItem('email-recovery', data.email);
      navigate(PATH_AUTH.newPassword, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Email address" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        Send Request
      </LoadingButton>
    </FormProvider>
  );
}
