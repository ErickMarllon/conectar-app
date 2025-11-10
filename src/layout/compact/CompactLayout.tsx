import { Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { HEADER } from '@/configs/global';
import useOffSetTop from '@/hooks/useOffSetTop';

export default function CompactLayout() {
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <>
      <Header isOffset={isOffset} />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          <Outlet />
        </Stack>
      </Container>
    </>
  );
}
