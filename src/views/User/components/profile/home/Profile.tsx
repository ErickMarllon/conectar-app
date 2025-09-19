// @mui
import { Grid, Stack } from '@mui/material';
// @types
import type { IUserProfile, IUserProfilePost } from '@/shared/interfaces/IUser';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

type Props = {
  info: IUserProfile;
  posts: IUserProfilePost[];
};

export default function Profile({ info, posts }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Stack spacing={3}>
          <ProfileAbout about={info.about} addresses={info.addresses} email={info.email} />

          <ProfileSocialInfo social_links={info.social_links} />
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 8 }}>
        <Stack spacing={3}>
          <ProfilePostInput />

          {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
