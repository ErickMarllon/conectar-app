// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Switch,
  FormControlLabel,
  type FormControlLabelProps,
  FormHelperText,
  Typography,
  type SwitchProps,
} from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends Omit<FormControlLabelProps, 'control' | 'label'> {
  name: string;
  helperText?: React.ReactNode;
  labelTitle?: string;
  labelDescription?: string;
  switchProps?: SwitchProps;
}

export default function RHFSwitch({
  name,
  helperText,
  labelTitle,
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
              (labelTitle || labelDescription) && (
                <>
                  {labelTitle && (
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      {labelTitle}
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
