// @mui
import { Link, Card, CardHeader, Stack } from '@mui/material';
// @types
import type { IUserSocialLink } from '@/shared/interfaces/IUser';
// components
import Iconify from '@/components/iconify';
import { socials_link } from '@/shared/constants/socials_links';

// ----------------------------------------------------------------------

type Props = {
  social_links: IUserSocialLink;
};

export default function ProfileSocialInfo({ social_links }: Props) {
  return (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {socials_link.map((link) => (
          <Stack key={link.name} direction="row" sx={{ wordBreak: 'break-all' }}>
            <Iconify
              icon={link.icon}
              sx={{
                mr: 2,
                flexShrink: 0,
                color: link.color,
              }}
            />
            <Link component="span" variant="body2" color="text.primary">
              {(link.value === 'facebook' && `${link.path}${social_links?.provider_facebook}`) ||
                (link.value === 'instagram' && `${link.path}${social_links?.provider_instagram}`) ||
                (link.value === 'linkedin' && `${link.path}${social_links?.provider_linkedin}`) ||
                `${link.path}${social_links?.provider_twitter}`}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
