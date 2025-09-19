import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/material';

export interface EditorProps {
  value?: string;
  error?: boolean;
  simple?: boolean;
  onChange?: (value: string) => void;
  helperText?: React.ReactNode;
  sx?: SxProps<Theme>;
  readOnly?: boolean;
  placeholder?: string;
  theme?: 'snow' | 'bubble';
}
