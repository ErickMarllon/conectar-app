import { IconButtonAnimate } from '@/components/animate';
import { CustomAvatar } from '@/components/custom-avatar';
import MenuPopover from '@/components/menu-popover';
import { PATH_DASHBOARD } from '@/routes/paths';
import { UserRole } from '@/shared/enums/role.enum';
import { useAuthStore } from '@/stores/userAuth.store';
import { formatFullName } from '@/utils/format/formatFullName';
import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Enterprise',
    linkTo: PATH_DASHBOARD.enterprise.account,
  },
  {
    label: 'Settings',
    linkTo: PATH_DASHBOARD.user.account,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    handleClosePopover();
    logout();
  };

  const handleClickItem = (path: string) => {
    handleClosePopover();
    navigate(path);
  };
  const fullNameUser = formatFullName(user?.first_name, user?.last_name);

  const visibleOptions = OPTIONS.reduce(
    (acc, opt) => {
      if (opt.label === 'Enterprise' && user?.role !== UserRole.USER) acc.push(opt);

      if (opt.label === 'Settings' && user?.id)
        acc.push({
          ...opt,
          linkTo: PATH_DASHBOARD.user.accountSlug(user.id),
        });

      if (opt.label !== 'Enterprise' && opt.label !== 'Settings') acc.push(opt);

      return acc;
    },
    [] as typeof OPTIONS,
  );

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar src={user?.avatar_url} alt={fullNameUser} name={fullNameUser} />
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {fullNameUser}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {visibleOptions.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
