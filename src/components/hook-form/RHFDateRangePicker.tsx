import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Stack, FormHelperText } from '@mui/material';
import dayjs from 'dayjs';

type Props = {
  name: string; // Ex: "dateRange"
  helperText?: React.ReactNode;
};

export default function RHFDateRange({ name, helperText }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const [start, end] = field.value || [null, null];

        return (
          <Box>
            <Stack direction="row" spacing={2}>
              <DatePicker
                label="Data inicial"
                value={start ? dayjs(start) : null}
                onChange={(date) => field.onChange([date?.toDate() ?? null, end])}
                maxDate={end ? dayjs(end) : undefined}
                slotProps={{
                  textField: { fullWidth: true, error: !!error },
                }}
              />
              <DatePicker
                label="Data final"
                value={end ? dayjs(end) : null}
                onChange={(date) => field.onChange([start, date?.toDate() ?? null])}
                minDate={start ? dayjs(start) : undefined}
                slotProps={{
                  textField: { fullWidth: true, error: !!error },
                }}
              />
            </Stack>
            {(!!error || helperText) && (
              <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>
            )}
          </Box>
        );
      }}
    />
  );
}
