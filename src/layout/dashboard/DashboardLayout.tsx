import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
// hooks
import { useThemesStore } from '@/stores/themes.store';
import useResponsive from '../../hooks/useResponsive';
// auth
import { useAuthStore } from '@/stores/userAuth.store';
// components
import Main from './Main';
import Header from './header';
import NavHorizontal from './nav/NavHorizontal';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';

//

export default function DashboardLayout() {
  const { themeLayout } = useThemesStore();
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) window.location.href = '/';
  }, [isAuthenticated, location]);
  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

  const renderContent = () => {
    if (isNavHorizontal) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          {isDesktop ? <NavHorizontal /> : renderNavVertical}

          <Main>
            <Outlet />
          </Main>
        </>
      );
    }

    if (isNavMini) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          <Box
            sx={{
              display: { lg: 'flex' },
              minHeight: { lg: 1 },
            }}
          >
            {isDesktop ? <NavMini /> : renderNavVertical}

            <Main>
              <Outlet />
            </Main>
          </Box>
        </>
      );
    }

    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}
        >
          {renderNavVertical}

          <Main>
            <Outlet />
          </Main>
        </Box>
      </>
    );
  };

  // return <AuthGuard> {renderContent()} </AuthGuard>;
  return <>{renderContent()}</>;
}
