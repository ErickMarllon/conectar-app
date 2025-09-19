// react-router-dom
import { Outlet, useLocation } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
//
import Header from './Header';
import Footer from './Footer';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();

  const isHome = pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1, maxWidth: '100%' }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
