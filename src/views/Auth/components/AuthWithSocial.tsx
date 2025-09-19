// @mui
import { Divider, IconButton, Stack } from '@mui/material';
// components
import Iconify from '@/components/iconify';
import { AuthService } from '@/services/authService';
import { useTenant } from '@/hooks/useTenant';

// ----------------------------------------------------------------------

export default function AuthWithSocial() {
  const redirectUrl = `${window.location.origin}/auth/callback`;
  const tenant = useTenant();
  const handleGoogleLogin = async () => {
    if (!tenant) return;
    AuthService.googleOAuth(redirectUrl, tenant);
  };

  const handleGithubLogin = async () => {
    if (!tenant) return;

    AuthService.metaeOAuth(redirectUrl, tenant);
  };

  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, ::after': {
            borderTopStyle: 'dashed',
          },
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton onClick={handleGoogleLogin} disabled={!tenant}>
          <Iconify icon="eva:google-fill" color="#DF3E30" />
        </IconButton>

        <IconButton color="inherit" onClick={handleGithubLogin} disabled={!tenant}>
          <Iconify icon="eva:facebook-fill" />
        </IconButton>
      </Stack>
    </div>
  );
}
