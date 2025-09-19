// @mui
import { Stack, Tooltip, Typography, type StackProps } from '@mui/material';
//
import Iconify from '../../iconify';

// ----------------------------------------------------------------------

const SPACING = 2.5;

interface Props extends StackProps {
  title: string;
  tooltip?: string;
}

export default function Block({
  title,
  tooltip,
  children,
  color = 'text.secondary',
  sx,
  ...other
}: Props) {
  return (
    <Stack gap={1.5} sx={{ mb: SPACING, ...sx }} {...other}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          color: color,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 'fontWeightMedium' }}>
          {title}
        </Typography>

        {tooltip && (
          <Tooltip title={tooltip}>
            <Iconify icon="eva:info-outline" width={16} sx={{ mx: 0.5 }} />
          </Tooltip>
        )}
      </Stack>

      {children}
    </Stack>
  );
}
