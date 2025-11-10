import { Box, Link, ListItemText, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import type { NavItemProps } from '../types';
import Iconify from '../../iconify';
import { StyledDotIcon, StyledIcon, StyledItem } from './styles';
import RoleBasedGuard from '@/auth/RoleBasedGuard';

export default function NavItem({
  item,
  depth,
  open,
  active,
  isExternalLink,
  ...other
}: NavItemProps) {
  const { t } = useTranslation('nav');

  const { title, path, icon, info, children, disabled, caption, roles } = item;

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem depth={depth} active={active} disabled={disabled} caption={!!caption} {...other}>
      {icon && <StyledIcon>{icon}</StyledIcon>}

      {subItem && (
        <StyledIcon>
          <StyledDotIcon active={active && subItem} />
        </StyledIcon>
      )}

      <ListItemText
        primary={`${t(title)}`}
        secondary={
          caption && (
            <Tooltip title={`${t(caption)}`} placement="top-start">
              <span>{`${t(caption)}`}</span>
            </Tooltip>
          )
        }
        slotProps={{
          primary: {
            noWrap: true,
            component: 'span',
            variant: active ? 'subtitle2' : 'body2',
          },
          secondary: {
            noWrap: true,
            variant: 'caption',
          },
        }}
      />

      {info && (
        <Box component="span" sx={{ lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {!!children && (
        <Iconify
          width={16}
          icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
          sx={{ ml: 1, flexShrink: 0 }}
        />
      )}
    </StyledItem>
  );

  const renderItem = () => {
    if (isExternalLink)
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );

    if (children) {
      return renderContent;
    }

    return (
      <Link component={RouterLink} to={path} underline="none">
        {renderContent}
      </Link>
    );
  };

  return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>;
}
