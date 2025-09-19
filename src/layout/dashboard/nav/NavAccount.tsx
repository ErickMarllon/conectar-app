// react router dom
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
// auth
import { useAuthStore } from '@/stores/userAuth.store';

// routes
import { PATH_DASHBOARD } from '@/routes/paths';
// components
import { CustomAvatar } from '@/components/custom-avatar';
import { formatFullName } from '@/utils/format/formatFullName';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { user } = useAuthStore();
  const displayName = formatFullName(user?.first_name, user?.last_name);
  return (
    <Link component={RouterLink} to={PATH_DASHBOARD.user.account} underline="none" color="inherit">
      <StyledRoot>
        <CustomAvatar src={user?.avatar_url} alt={displayName} name={displayName} />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {displayName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {user?.role}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}
