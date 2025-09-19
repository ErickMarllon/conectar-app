// hooks
import useOffSetTop from '@/hooks/useOffSetTop';
// config
import { HEADER } from '@/configs/global';
import Header from './Header';
import { Outlet } from 'react-router-dom';
//

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <>
      <Header isOffset={isOffset} />
      <Outlet />
    </>
  );
}
