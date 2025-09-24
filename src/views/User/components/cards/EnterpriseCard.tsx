// @mui
import Iconify from '@/components/iconify';
import Image from '@/components/image';
import SvgColor from '@/components/svg-color';
import { PATH_DASHBOARD } from '@/routes/paths';
import { socials_link } from '@/shared/constants/socials_links';
import type { ITenantAccountGeneral, ITenantSocialLink } from '@/shared/interfaces/ITenant';
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
  enterprise: ITenantAccountGeneral;
};

export default function EnterpriseCard({ enterprise }: Props) {
  const {
    id,
    name,
    email,
    whatsapp,
    phone_number,
    slug,
    cover_url,
    logo_url,
    social_links,
    addresses,
  } = enterprise;

  const DefaultAddress = addresses?.find((a) => a.is_default);
  return (
    <Card sx={{ textAlign: 'center' }}>
      <NavLink
        to={PATH_DASHBOARD.enterprise.accountSlug(id)}
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
          <NavLink
            to={PATH_DASHBOARD.enterprise.accountSlug(id)}
            style={{ textDecoration: 'none' }}
          >
            <Avatar
              alt={name}
              src={logo_url}
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

          {cover_url ? (
            <Image src={cover_url} alt={slug} ratio="16/9" />
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
      <Stack
        display="grid"
        gridTemplateColumns="repeat(4, minmax(36px)"
        // alignItems="start"
        justifyContent="center"
        columnGap={3}
      >
        {/* Info Pessoal */}
        <Stack gridColumn=" 1/ -1" paddingX={3} direction="row" flexWrap="wrap" gap={0.5}>
          {name && (
            <Typography
              variant="subtitle1"
              sx={{ mt: 6, width: '100%', textAlign: 'center', textTransform: 'capitalize' }}
            >
              {name.toLowerCase()}
            </Typography>
          )}
          {email && (
            <Typography
              variant="subtitle2"
              sx={{ display: 'flex', width: '100%', textAlign: 'left', alignItems: 'center' }}
            >
              <IconButton
                component={'a'}
                href={'href'}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#1877F2',
                  borderRadius: 100,
                  padding: 0.5,
                  '&:hover': {
                    color: alpha('#1877F2', 0.08),
                  },
                }}
              >
                <Iconify icon={'ant-design:mail-filled'} color={'#1877F2'} />
              </IconButton>
              {email}
            </Typography>
          )}
          {whatsapp && (
            <Typography
              variant="subtitle2"
              sx={{ display: 'flex', width: '100%', textAlign: 'left', alignItems: 'center' }}
            >
              <IconButton
                component={'a'}
                href={'href'}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#31ba0f',
                  borderRadius: 100,
                  padding: 0.5,
                  '&:hover': {
                    color: alpha('#31ba0f', 0.08),
                  },
                }}
              >
                <Iconify icon={'ant-design:whats-app-outlined'} color={'#31ba0f'} />
              </IconButton>
              {whatsapp}
            </Typography>
          )}
          {phone_number && (
            <Typography variant="subtitle2">
              <IconButton
                component={'a'}
                href={`tel:${phone_number}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#1877F2',
                  borderRadius: 100,
                  padding: 0.5,
                  '&:hover': {
                    color: alpha('#1877F2', 0.08),
                  },
                }}
              >
                <Iconify icon={'ant-design:phone-filled'} color={'#1877F2'} />
              </IconButton>
              {phone_number}
            </Typography>
          )}
        </Stack>

        {/* Endereço */}
        {DefaultAddress && (
          <Stack
            gridColumn=" 1/ -1"
            alignItems={'center'}
            paddingX={3}
            direction="row"
            flexWrap="wrap"
            gap={0.5}
          >
            <IconButton
              component={'a'}
              href={'href'}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#929ba6',
                borderRadius: 100,
                padding: 0.5,
                '&:hover': {
                  color: alpha('#929ba6', 0.08),
                },
              }}
            >
              <Iconify icon={'material-symbols:location-on'} color={'#929ba6'} />
            </IconButton>
            {DefaultAddress.street && (
              <Typography variant="subtitle2">{DefaultAddress.street}</Typography>
            )}
            {DefaultAddress.street_number && (
              <Typography variant="subtitle2">, {DefaultAddress.street_number}</Typography>
            )}
            {DefaultAddress.neighborhood && (
              <Typography variant="subtitle2"> - {DefaultAddress.neighborhood}</Typography>
            )}
            {DefaultAddress.state && (
              <Typography variant="subtitle2"> - {DefaultAddress.state}</Typography>
            )}
          </Stack>
        )}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 1, mb: 3, width: '100%', display: 'flex', gap: 3 }}
      >
        {socials_link.map((social) => {
          const key = `provider_${social.value}` as keyof ITenantSocialLink;
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
