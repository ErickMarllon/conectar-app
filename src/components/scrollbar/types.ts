import type { SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { Props } from 'simplebar-react';
// @mui

// ----------------------------------------------------------------------

export interface ScrollbarProps extends Props {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}
