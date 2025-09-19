import '@/utils/highlight';
import { Suspense } from 'react';
// @mui
import { Skeleton } from '@mui/material';
//
import type { EditorProps } from './types';
import { StyledEditor } from './styles';
import QuillEditor from './QuillEditor';

// ----------------------------------------------------------------------

export default function Editor({ error, value, onChange, helperText, sx, ...other }: EditorProps) {
  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <Suspense
          fallback={
            <Skeleton
              variant="rounded"
              sx={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: 1,
                position: 'absolute',
              }}
            />
          }
        >
          <QuillEditor defaultValue={value} onChange={onChange} {...other} />
        </Suspense>
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
Editor.displayName = 'Editor';
