import { Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { varFade } from '@/components/animate';
import Iconify from '@/components/iconify';
import { PATH_AUTH, PATH_PAGE } from '@/routes/paths';
import { textGradient } from '@/utils/cssStyles';

const StyledDescription = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(15, 0),
  height: '100%',
}));

const StyledGradientText = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`,
  ),
  backgroundSize: '400%',
  fontFamily: '',
  fontSize: `${64 / 16}rem`,
  textAlign: 'center',
  lineHeight: 1,
  padding: 0,
  marginTop: 8,
  marginBottom: 24,
  letterSpacing: 8,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
}));

export default function Description() {
  const { t } = useTranslation();

  return (
    <StyledDescription>
      <m.div initial={varFade().in.initial} animate={varFade().in.animate} exit={varFade().in.exit}>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          {t('home:hero.title')}
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <StyledGradientText
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          {t('home:hero.highlightName')}
        </StyledGradientText>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {t('home:hero.description')}
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Stack gap={1.5} direction={{ xs: 'column-reverse', sm: 'row' }} sx={{ my: 5 }}>
          <Stack alignItems="center" gap={2}>
            <Button
              component={RouterLink}
              to={PATH_AUTH.register}
              color="inherit"
              size="large"
              variant="contained"
              sx={{
                bgcolor: 'text.primary',
                gap: 1,
                textAlign: 'center',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              }}
            >
              {t('actions:startFreeTrial')}
            </Button>
          </Stack>

          <Button
            color="inherit"
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="logos:whatsapp-monochrome-icon" width={24} />}
            rel="noopener"
            href={PATH_PAGE.comingSoon}
            sx={{
              borderColor: 'text.primary',
              gap: 1,
              textAlign: 'center',
            }}
          >
            {t('actions:talkToSales')}
          </Button>
        </Stack>
      </m.div>
    </StyledDescription>
  );
}
