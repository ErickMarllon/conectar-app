import { ListItemButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import type { NavItemMobileProps } from '../types';
import { NAV } from '@/configs/global';

type ListItemProps = Omit<NavItemMobileProps, 'item'>;

export const ListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ListItemProps>(({ active, theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: NAV.H_DASHBOARD_ITEM,
  ...(active && {
    color: theme.palette.primary.main,
    ...theme.typography.subtitle2,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }),
}));
