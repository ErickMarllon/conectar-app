import { _userAbout, _userInvoices, _userPayment, _socials } from '@/_mock/arrays';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Iconify from '@/components/iconify';
import { PATH_DASHBOARD } from '@/routes/paths';
import { UserRole } from '@/shared/enums/role.enum';
import { useThemesStore } from '@/stores/themes.store';
import { useAuthStore } from '@/stores/userAuth.store';
import { Box, Container, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import {
  AccountBilling,
  AccountChangePassword,
  AccountGeneral,
  AccountSocialLinks,
} from './components/account';
import { useSocialByUser } from '@/queries/user/social/get/useSocialByUser';
import { useParams } from 'react-router-dom';
import { parseIdentifier } from '@/utils/parseIdentifierSlug';

export function UserAccountPage() {
  const { themeStretch } = useThemesStore();
  const { user } = useAuthStore();
  const { slug } = useParams<{ slug: string }>();
  const { id } = parseIdentifier(slug);
  const [currentTab, setCurrentTab] = useState('general');
  const { data: socialLinks } = useSocialByUser(id ?? user?.id);
  // const { data: userData, isLoading } = useUserById(id ?? user?.id);

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral />,
    },
    // {
    //   value: 'enterprise',
    //   label: 'Enterprise',
    //   icon: <Iconify icon="mdi:office-building" />,
    //   component: <AccountEnterprise />,
    // },
    {
      value: 'billing',
      label: 'Billing',
      icon: <Iconify icon="ic:round-receipt" />,
      component: <AccountBilling cards={_userPayment} invoices={_userInvoices} />,
    },
    // {
    //   value: 'notifications',
    //   label: 'Notifications',
    //   icon: <Iconify icon="eva:bell-fill" />,
    //   component: <AccountNotifications />,
    // },
    {
      value: 'social_links',
      label: 'Social links',
      icon: <Iconify icon="eva:share-fill" />,
      component: <AccountSocialLinks social_links={socialLinks} user_id={id} tenant_id={id} />,
    },
    {
      value: 'change_password',
      label: 'Change password',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword user_id={id} />,
    },
  ];

  const visibleTabs = TABS.filter(
    (tab) => !(tab.value === 'enterprise' && user?.role === UserRole.USER),
  );
  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Account"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'User', href: PATH_DASHBOARD.user.root },
          { name: 'Account Settings' },
        ]}
      />

      <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)}>
        {visibleTabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {TABS.map(
        (tab) =>
          tab.value === currentTab && (
            <Box key={tab.value} sx={{ mt: 5 }}>
              {tab.component}
            </Box>
          ),
      )}
    </Container>
  );
}
