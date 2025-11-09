import { List, Stack } from '@mui/material';
import type { NavSectionProps } from '../types';
import NavList from './NavList';
import { StyledSubheader } from './styles';
import { useTranslation } from 'react-i18next';

export default function NavSectionVertical({ data, sx, ...other }: NavSectionProps) {
  const { t } = useTranslation('nav');

  return (
    <Stack sx={sx} {...other}>
      {data.map((group) => {
        const key = group.subheader || group.items[0].title;

        return (
          <List key={key} disablePadding sx={{ px: 2 }}>
            {group.subheader && (
              <StyledSubheader disableSticky>{`${t(group.subheader)}`}</StyledSubheader>
            )}

            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                depth={1}
                hasChild={!!list.children}
              />
            ))}
          </List>
        );
      })}
    </Stack>
  );
}
