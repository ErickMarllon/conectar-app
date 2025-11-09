// @mui
import { AppBar, Box, Button, Container, Stack, Toolbar, type BoxProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// hooks
import useOffSetTop from '@/hooks/useOffSetTop';
import useResponsive from '@/hooks/useResponsive';
// utils
import { bgBlur } from '@/utils/cssStyles';
// config
import { HEADER } from '@/configs/global';
// routes
import { PATH_PAGE } from '@/routes/paths';
// components
import Logo from '@/components/logo';
//
import SettingsDrawer from '@/components/settings/drawer';
import navConfig from './nav/config-navigation';
import NavDesktop from './nav/desktop';
import NavMobile from './nav/mobile';
import { Link as RouterLink } from 'react-router-dom';
import LanguagePopover from '../dashboard/header/LanguagePopover';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();
  const { t } = useTranslation();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          sx={{
            height: 1,
            display: 'flex',
            gap: { md: 1.2 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Logo />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <NavDesktop isOffset={isOffset} data={navConfig} />}

          <Stack
            component="div"
            direction="row"
            alignItems={'center'}
            gap={{ md: 1.5 }}
            sx={{
              mr: theme.direction == 'ltr' ? 0 : 4,
              ml: theme.direction == 'ltr' ? 4 : 0,
            }}
          >
            <Button
              variant="contained"
              component={RouterLink}
              size={isDesktop ? 'medium' : 'small'}
              rel="noopener"
              sx={{
                whiteSpace: 'nowrap',
              }}
              to={PATH_PAGE.pricing}
            >
              {t('actions:purchasenow')}
            </Button>

            <LanguagePopover />
            <SettingsDrawer />
          </Stack>

          {!isDesktop && <NavMobile isOffset={isOffset} data={navConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
