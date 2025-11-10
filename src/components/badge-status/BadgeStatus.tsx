import type { BadgeStatusProps } from './types';
import { StyledBadgeStatus } from './styles';

export default function BadgeStatus({ size = 'medium', status = 'offline', sx }: BadgeStatusProps) {
  return <StyledBadgeStatus ownerState={{ status, size }} sx={sx} />;
}
