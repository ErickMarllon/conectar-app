import { Outlet } from 'react-router-dom';
import Header from './Header';
import { HEADER } from '@/configs/global';
import useOffSetTop from '@/hooks/useOffSetTop';

export default function SimpleLayout() {
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <>
      <Header isOffset={isOffset} />
      <Outlet />
    </>
  );
}
