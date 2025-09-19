import { m } from 'framer-motion';
// react router dom
import { Link as RouterLink } from 'react-router-dom';
// @mui

import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
// routes
import { PATH_AUTH, PATH_PAGE } from '@/routes/paths';
// hooks
import useResponsive from '@/hooks/useResponsive';
// utils
import { bgGradient, textGradient } from '@/utils/cssStyles';
// config
import { HEADER } from '@/configs/global';
// theme
// components
import { MotionContainer, varFade } from '@/components/animate';
import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'fixed',
  },
}));

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

const StyledEllipseTop = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: 480,
  top: -80,
  right: -80,
  borderRadius: '50%',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: 400,
  bottom: -200,
  left: '10%',
  right: '10%',
  borderRadius: '50%',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.08),
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <>
      <StyledRoot>
        <Container component={MotionContainer} sx={{ height: 1 }}>
          <Grid container spacing={10} sx={{ height: 1 }}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ height: 1 }}>
              <Description />
            </Grid>
            {isDesktop && (
              <Grid size={{ xs: 12, md: 6 }}>
                <Content />
              </Grid>
            )}
          </Grid>
        </Container>

        <StyledEllipseTop />

        <StyledEllipseBottom />
      </StyledRoot>

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <StyledDescription>
      <m.div initial={varFade().in.initial} animate={varFade().in.animate} exit={varFade().in.exit}>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Gestão Inteligente para Seu Negócio
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
          Fluxo
        </StyledGradientText>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Assuma o controle total do seu negócio com nosso sistema completo de gestão, que oferece
          agendamento online, organização inteligente e ferramentas para otimizar processos.
          Gerencie clientes com eficiência, aumente a fidelização, reduza falhas operacionais e
          impulsione suas vendas com estratégias inteligentes. Transforme seu fluxo de trabalho e
          alcance o sucesso que seu negócio merece!
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
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'text.primary',
                },
              }}
            >
              Teste Grátis
            </Button>
          </Stack>

          <Button
            color="inherit"
            size="large"
            variant="outlined"
            startIcon={<Iconify icon="logos:whatsapp-monochrome-icon" width={24} />}
            rel="noopener"
            href={PATH_PAGE.comingSoon}
            sx={{ borderColor: 'text.primary', gap: 1 }}
          >
            Falar com vendas
          </Button>
        </Stack>
      </m.div>
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const transition = {
    repeatType: 'loop',
    ease: 'linear',
    duration: 60 * 4,
    repeat: Infinity,
  } as const;

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      sx={{
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        mt: `${HEADER.H_MAIN_DESKTOP}px`,
      }}
    >
      <Stack component={m.div} variants={varFade().in} sx={{ width: 344, position: 'relative' }}>
        <Box
          component={m.img}
          animate={{ y: ['0%', '100%'] }}
          transition={transition}
          alt={`hero_${isLight ? 'light' : 'dark'}_1`}
          src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_1.png`}
          sx={{ position: 'absolute' }}
        />
        <Box
          component={m.img}
          animate={{ y: ['-100%', '0%'] }}
          transition={transition}
          alt={`hero_${isLight ? 'light' : 'dark'}_1`}
          src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_1.png`}
          sx={{ position: 'absolute' }}
        />
      </Stack>

      <Stack
        component={m.div}
        variants={varFade().in}
        sx={{ width: 720, position: 'relative', ml: -2 }}
      >
        <Box
          component={m.img}
          animate={{ y: ['100%', '0%'] }}
          transition={transition}
          alt={`hero_${isLight ? 'light' : 'dark'}_2`}
          src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_2.png`}
          sx={{ position: 'absolute' }}
        />
        <Box
          component={m.img}
          animate={{ y: ['0%', '-100%'] }}
          transition={transition}
          alt={`hero_${isLight ? 'light' : 'dark'}_2`}
          src={`/assets/images/home/hero_${isLight ? 'light' : 'dark'}_2.png`}
          sx={{ position: 'absolute' }}
        />
      </Stack>
    </Stack>
  );
}
