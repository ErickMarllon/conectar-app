import type { DropzoneOptions } from 'react-dropzone';
// @mui
import type { SxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  sx?: SxProps<Theme>;
  thumbnail?: boolean;
  placeholder?: React.ReactNode;
  helperText?: React.ReactNode;
  disableMultiple?: boolean;
  //
  file?: CustomFile | string | null;
  onDelete?: VoidFunction;
  //
  files?: (File | string)[];
  onUpload?: VoidFunction;
  onRemove?: (file: CustomFile | string) => void;
  onRemoveAll?: VoidFunction;
  //
  placeholderTitle?: string;
  placeholderDescription?: string;
}
