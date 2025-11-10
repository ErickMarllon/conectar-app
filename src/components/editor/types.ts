import type { SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';

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
