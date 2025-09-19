// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import {
  Stack,
  Button,
  Rating,
  Dialog,
  Typography,
  DialogTitle,
  type DialogProps,
  DialogActions,
  DialogContent,
  FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import FormProvider, { RHFTextField } from '@/components/hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReviewSchema } from '@/schemas/review-schema';
import type { z } from 'zod';

// ----------------------------------------------------------------------

export type FormValuesProps = z.infer<typeof ReviewSchema>;

interface Props extends DialogProps {
  onClose: VoidFunction;
}

export default function ProductDetailsNewReviewForm({ onClose, ...other }: Props) {
  const defaultValues = {
    rating: null,
    review: '',
    name: '',
    email: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: zodResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const onCancel = () => {
    onClose();
    reset();
  };

  return (
    <Dialog onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle> Add Review </DialogTitle>

        <DialogContent>
          <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
            <Typography variant="body2">Your review about this product:</Typography>

            <Controller
              name="rating"
              control={control}
              render={({ field }) => <Rating {...field} value={Number(field.value)} />}
            />
          </Stack>

          {!!errors.rating && (
            <FormHelperText error> {errors?.rating?.message as string}</FormHelperText>
          )}

          <RHFTextField name="review" label="Review *" multiline rows={3} sx={{ mt: 3 }} />

          <RHFTextField name="name" label="Name *" sx={{ mt: 3 }} />

          <RHFTextField name="email" label="Email *" sx={{ mt: 3 }} />
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onCancel}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Post review
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
