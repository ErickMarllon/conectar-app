import { filterStyles } from '@/utils/cssStyles';
import { Box, type BoxProps } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

interface TriangleShapeProps extends BoxProps {
  anchor?: 'top' | 'bottom';
}

export default function TriangleShape({ anchor = 'top', ...other }: TriangleShapeProps) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        width: 1,
        position: 'absolute',
        color: theme.palette.background.default,
        zIndex: 10,
        height: { xs: 40, md: 84 },
        ...filterStyles(
          `drop-shadow(320px 20px 80px ${
            isLight ? alpha(theme.palette.grey[700], 0.4) : theme.palette.common.black
          })`,
        ),
        ...(anchor === 'bottom' && {
          zIndex: 9,
          bottom: 0,
          top: 'unset',
          color: 'grey.900',
          transform: 'scale(-1)',
          ...filterStyles('none'),
        }),
      }}
      {...other}
    >
      <svg width="100%" height="100%" viewBox="0 0 1440 64" preserveAspectRatio="none">
        <path d="M1440 0H0L1440 64V0Z" fill="currentColor" />
      </svg>
    </Box>
  );
}
