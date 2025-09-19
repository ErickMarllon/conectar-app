import { StyledBadgeStatus } from './styles';
import type { BadgeStatusProps } from './types';

// ----------------------------------------------------------------------

export default function BadgeStatus({ size = 'medium', status = 'offline', sx }: BadgeStatusProps) {
  return <StyledBadgeStatus ownerState={{ status, size }} sx={sx} />;
}
