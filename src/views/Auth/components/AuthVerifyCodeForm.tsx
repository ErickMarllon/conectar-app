import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { FormHelperText, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { z } from 'zod';
import FormProvider, { RHFCodes } from '@/components/hook-form';
import { PATH_DASHBOARD } from '@/routes/paths';
import { verificationCodeSchema } from '@/schemas/verification-code-schema';

type FormValuesProps = z.infer<typeof verificationCodeSchema>;

export default function AuthVerifyCodeForm() {
  const navigate = useNavigate();

  const methods = useForm<FormValuesProps>({
    mode: 'onChange',
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: verificationCodeSchema.partial().parse({}),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('DATA', Object.values(data).join(''));
      toast.success('Verify success!');
      navigate(PATH_DASHBOARD.root);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
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

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Verify
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
