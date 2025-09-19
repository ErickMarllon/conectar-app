import type { Props } from 'simplebar-react';
// @mui
import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface ScrollbarProps extends Props {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}
