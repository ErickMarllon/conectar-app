// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/x-date-pickers';
import { Stack, MenuItem } from '@mui/material';
// components
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import dayjs, { Dayjs } from 'dayjs';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['paid', 'unpaid', 'overdue', 'draft'];

// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate() {
  const { control, watch } = useFormContext();
  const values = watch();
  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 3, bgcolor: 'background.neutral' }}
    >
      <RHFTextField
        disabled
        name="invoiceNumber"
        label="Invoice number"
        value={`INV-${values.invoiceNumber}`}
      />

      <RHFSelect
        fullWidth
        name="status"
        label="Status"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </RHFSelect>

      <Controller
        name="createDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Date create"
            value={field.value ? dayjs(field.value) : null}
            onChange={(newValue: Dayjs | null) => {
              field.onChange(newValue ? newValue.toDate() : null);
            }}
            maxDate={values.dueDate ? dayjs(values.dueDate) : undefined}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      />

      <Controller
        name="dueDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Due date"
            value={field.value ? dayjs(field.value) : null}
            onChange={(newValue: Dayjs | null) => {
              field.onChange(newValue ? newValue.toDate() : null);
            }}
            minDate={values.createDate ? dayjs(values.createDate) : undefined}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      />
    </Stack>
  );
}
