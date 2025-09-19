import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, FormHelperText } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

type Props = {
  name: string;
  helperText?: React.ReactNode;
};

export default function RHFDatePicker({ name, helperText }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box>
          <DatePicker
            value={field.value ? dayjs(field.value) : null}
            onChange={(newValue: Dayjs | null) => {
              field.onChange(newValue ? newValue.toDate() : null);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
              },
            }}
          />
          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>
          )}
        </Box>
      )}
    />
  );
}
