// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { InputAdornment, TextField, type TextFieldProps } from '@mui/material';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  isClean?: boolean;
};

export default function RHFTextField({ name, isClean, helperText, ...other }: Props) {
  const { control, resetField } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          name={name}
          id={name}
          fullWidth
          slotProps={{
            input: {
              autoComplete: `no-auto-complete-${Math.random()}`,
              endAdornment: field.value && isClean && (
                <InputAdornment
                  position="end"
                  onClick={() => resetField(name, undefined)}
                  sx={{ cursor: 'pointer', m: 0 }}
                >
                  <Iconify icon="eva:close-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
          value={typeof field.value === 'number' && field.value === 0 ? '' : (field.value ?? '')}
          onChange={(e) => field.onChange(e.target.value.trimStart())}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
