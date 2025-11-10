import type { SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { Options } from 'react-markdown';

// ----------------------------------------------------------------------

export interface MarkdownProps extends Options {
  sx?: SxProps<Theme>;
}
