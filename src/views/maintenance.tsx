import { Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { MaintenanceIllustration } from '../assets/illustrations';

export function MaintenancePage() {
  return (
    <>
      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant="h3">Website currently under maintenance</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          We are currently working hard on this page!
        </Typography>

        <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

        <Button component={RouterLink} to="/" size="large" variant="contained">
          Go to Home
        </Button>
      </Stack>
    </>
  );
}
