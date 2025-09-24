// @mui
import Iconify from '@/components/iconify';
import Image from '@/components/image';
import SvgColor from '@/components/svg-color';
import { PATH_DASHBOARD } from '@/routes/paths';
import { socials_link } from '@/shared/constants/socials_links';
import type { IUserCard, IUserSocialLink } from '@/shared/interfaces/IUser';
import { formatFullName } from '@/utils/format/formatFullName';
import { Avatar, Box, Card, IconButton, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

type Props = {
  user: IUserCard;
};

export default function UserCard({ user }: Props) {
  const { first_name, last_name, cover, role, avatar_url, social_links } = user;

  const name = formatFullName(first_name, last_name);
  return (
    <Card sx={{ textAlign: 'center' }}>
      <NavLink
        to={PATH_DASHBOARD.user.accountSlug(user.id)}
        style={{ textDecoration: 'none', cursor: 'pointer', zIndex: 100 }}
      >
        <Box sx={{ position: 'relative' }}>
          <SvgColor
            src="/assets/shape_avatar.svg"
            sx={{
              width: 144,
              height: 62,
              zIndex: 10,
              left: 0,
              right: 0,
              bottom: -26,
              mx: 'auto',
              position: 'absolute',
              color: 'background.paper',
            }}
          />
          <NavLink to={PATH_DASHBOARD.user.accountSlug(user.id)} style={{ textDecoration: 'none' }}>
            <Avatar
              alt={name}
              src={avatar_url}
              sx={{
                width: 64,
                height: 64,
                zIndex: 11,
                left: 0,
                right: 0,
                bottom: -32,
                mx: 'auto',
                position: 'absolute',
                cursor: 'pointer',
              }}
            />
          </NavLink>

          <StyledOverlay />

          {cover ? (
            <Image src={cover} alt={cover} ratio="16/9" />
          ) : (
            <Box
              sx={{
                width: '100%',
                position: 'relative',
                aspectRatio: '16/9',
                bgcolor: (theme) => theme.palette.primary.main,
              }}
            />
          )}
        </Box>
      </NavLink>
      <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {role}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 1, mb: 3, width: '100%', display: 'flex', gap: 3 }}
      >
        {socials_link.map((social) => {
          const key = `provider_${social.value}` as keyof IUserSocialLink;
          const providerValue = social_links?.[key];
          const href = providerValue ? `${social.path}${providerValue}` : undefined;
          return (
            <IconButton
              key={social.name}
              component={href ? 'a' : 'button'}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              disabled={!href}
              sx={{
                color: social.color,
                '&:hover': {
                  bgcolor: alpha(social.color, 0.08),
                },
              }}
            >
              <Iconify icon={social.icon} />
            </IconButton>
          );
        })}
      </Stack>
    </Card>
  );
}
