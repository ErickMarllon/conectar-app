// @mui
import type { DialogProps } from '@mui/material';
import type React from 'react';

// ----------------------------------------------------------------------

export type ConfirmDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  title: React.ReactNode;
  content?: React.ReactNode;
  action: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
};
