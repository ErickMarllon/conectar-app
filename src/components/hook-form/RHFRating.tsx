import { Box, FormHelperText, Rating, Typography, type RatingProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';


type Props = RatingProps & {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
};

export default function RHFRating({ name, label, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box gap={1}>
          <Typography variant="subtitle1">{label}</Typography>

          <Rating
            {...field}
            value={Number(field.value) || 0}
            onChange={(_, value) => field.onChange(value)}
            {...other}
          />
          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>
          )}
        </Box>
      )}
    />
  );
}
