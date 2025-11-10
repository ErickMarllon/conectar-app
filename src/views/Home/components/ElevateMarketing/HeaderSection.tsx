import { Stack, Typography, useTheme } from '@mui/material';
import { m } from 'framer-motion';
import { Trans } from 'react-i18next';
import { varFade } from '@/components/animate';
import { textGradient } from '@/utils/cssStyles';

export default function HeaderSection() {
  const theme = useTheme();

  return (
    <Stack
      spacing={3}
      sx={{
        textAlign: 'center',
        mb: { xs: 5, md: 10 },
      }}
    >
      <m.div variants={varFade().inDown}>
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            mb: 5,
            ...textGradient(
              `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 100%`,
            ),
          }}
        >
          <Trans i18nKey="elevateMarketing.title" components={[<br />]} ns="home" />
        </Typography>
      </m.div>
    </Stack>
  );
}
