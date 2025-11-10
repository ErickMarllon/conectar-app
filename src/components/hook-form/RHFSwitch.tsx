import {
  FormControlLabel,
  FormHelperText,
  Switch,
  Typography,
  type FormControlLabelProps,
  type SwitchProps,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';


interface Props extends Omit<FormControlLabelProps, 'control' | 'label'> {
  name: string;
  helperText?: React.ReactNode;
  label?: string;
  labelDescription?: string;
  switchProps?: SwitchProps;
}

export default function RHFSwitch({
  name,
  helperText,
  label,
  labelDescription,
  switchProps,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel
            control={<Switch {...field} id={name} {...switchProps} />}
            sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
            label={
              (label || labelDescription) && (
                <>
                  {label && (
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      {label}
                    </Typography>
                  )}
                  {labelDescription && (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {labelDescription}
                    </Typography>
                  )}
                </>
              )
            }
            {...other}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}
