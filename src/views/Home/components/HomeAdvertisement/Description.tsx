import { Box, Button, Stack } from '@mui/material';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { varFade } from '@/components/animate';
import Iconify from '@/components/iconify';
import { PATH_FREE_VERSION, PATH_PAGE } from '@/routes/paths';

export default function Description() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        textAlign: {
          xs: 'center',
          md: 'left',
        },
      }}
    >
      <Box
        component={m.div}
        variants={varFade().inDown}
        sx={{ color: 'common.white', mb: 5, typography: 'h2' }}
      >
        {t('home:homeAdvertisement.getstarted')}
      </Box>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        spacing={2}
      >
        <m.div variants={varFade().inRight}>
          <Button
            component={RouterLink}
            color="inherit"
            size="large"
            variant="contained"
            rel="noopener"
            to={PATH_PAGE.pricing}
            sx={{
              color: 'grey.800',
              bgcolor: 'common.white',
            }}
          >
            {t('actions:purchasenow')}
          </Button>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Button
            color="inherit"
            size="large"
            variant="outlined"
            target="_blank"
            rel="noopener"
            href={PATH_FREE_VERSION}
            endIcon={<Iconify icon="eva:external-link-fill" width={16} sx={{ mr: 0.5 }} />}
            sx={{ color: 'common.white', '&:hover': { borderColor: 'currentColor' } }}
          >
            {t('actions:getfreeversion')}
          </Button>
        </m.div>
      </Stack>
    </Box>
  );
}
