// @mui
import { Card, CardHeader, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// @types
import type { IUserProfileAbout } from '@/shared/interfaces/IUser';
// components
import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

export default function ProfileAbout({ about, addresses, email }: IUserProfileAbout) {
  const address = addresses?.find((a) => a.is_default);
  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {about && <Typography variant="body2">{about}</Typography>}

        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">
            {address?.street}, {address?.street_number} - {address?.state}
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Typography variant="body2">{email}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
