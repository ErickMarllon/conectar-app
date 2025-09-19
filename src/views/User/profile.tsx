import { useState } from 'react';

// @mui
import { Box, Card, Container, Tab, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';
// auth
import { useAuthStore } from '@/stores/userAuth.store';
// _mock_
import { _userAbout, _userFeeds, _userGallery } from '@/_mock/arrays';

// components
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Iconify from '@/components/iconify';
import { useThemesStore } from '@/stores/themes.store';
// sections
import Loading from '@/components/loading';
import { useUserProfile } from '@/queries/user/profile/useUserProfile';
import type { IAddress } from '@/shared/interfaces/IAddress';
import type { IUserSocialLink } from '@/shared/interfaces/IUser';
import { formatFullName } from '@/utils/format/formatFullName';
import { parseIdentifier } from '@/utils/parseIdentifierSlug';
import { useParams } from 'react-router-dom';
import { Profile, ProfileCover, ProfileGallery } from './components/profile';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function UserProfilePage() {
  const { themeStretch } = useThemesStore();
  const { slug } = useParams<{ slug: string }>();
  const { id: user_id } = parseIdentifier(slug);

  const { user } = useAuthStore();
  const userId = user_id ?? user?.id;
  const { data: userData, isLoading } = useUserProfile({ userId });

  const [currentTab, setCurrentTab] = useState('profile');
  _userAbout.social_links = userData?.social_links ?? ({} as IUserSocialLink);
  _userAbout.addresses = userData?.addresses ?? ([] as IAddress[]);
  _userAbout.email = userData?.email ?? '';
  _userAbout.about = userData?.about ?? '';
  const TABS = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Profile info={_userAbout} posts={_userFeeds} />,
    },

    {
      value: 'gallery',
      label: 'Gallery',
      icon: <Iconify icon="ic:round-perm-media" />,
      component: <ProfileGallery gallery={_userGallery} />,
    },
  ];

  const displayName = formatFullName(user?.first_name, user?.last_name);

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: displayName },
          ]}
        />
        {isLoading && <Loading mode="modal" />}
        {userData && !isLoading && (
          <Card
            sx={{
              mb: 3,
              height: 280,
              position: 'relative',
            }}
          >
            <ProfileCover name={displayName} role={userData.role} cover={_userAbout.cover} />

            <Tabs
              value={currentTab}
              onChange={(_, newValue) => setCurrentTab(newValue)}
              sx={{
                width: 1,
                bottom: 0,
                zIndex: 9,
                position: 'absolute',
                bgcolor: 'background.paper',
                '& .MuiTabs-flexContainer': {
                  pr: { md: 3 },
                  justifyContent: {
                    sm: 'center',
                    md: 'flex-end',
                  },
                },
              }}
            >
              {TABS.map((tab) => (
                <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
              ))}
            </Tabs>
          </Card>
        )}

        {TABS.map(
          (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>,
        )}
      </Container>
    </>
  );
}
