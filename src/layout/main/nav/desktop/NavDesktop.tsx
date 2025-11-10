import { Stack } from '@mui/material';
import type { NavProps } from '../types';
import NavList from './NavList';

export default function NavDesktop({ isOffset, data }: NavProps) {
  return (
    <Stack component="nav" direction="row" gap={3} sx={{ height: 1 }}>
      {data.map((link) => (
        <NavList key={link.title} item={link} isOffset={isOffset} />
      ))}
    </Stack>
  );
}
