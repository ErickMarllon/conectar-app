import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Iconify from '@/components/iconify';
import { useSocialByUser } from '@/queries/user/social/get/useSocialByUser';
import { PATH_DASHBOARD } from '@/routes/paths';
import { UserRole } from '@/shared/enums/role.enum';
import { useThemesStore } from '@/stores/themes.store';
import { useAuthStore } from '@/stores/userAuth.store';
import { parseIdentifier } from '@/utils/parseIdentifierSlug';
import { Box, Container, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AccountChangePassword, AccountEnterprise, AccountSocialLinks } from './components/account';
import UserNewEditForm from './components/UserNewEditForm';

type ITabs = 'enterprise' | 'general' | 'social_links' | 'change_password';
export function UserAccountPage() {
  const { themeStretch } = useThemesStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const locale = useLocation();
  const { id } = parseIdentifier(slug);
  const [currentTab, setCurrentTab] = useState<ITabs>('general');
  const isEnterprise = locale.pathname === PATH_DASHBOARD.enterprise.account;
  const { data: userSocialLinks } = useSocialByUser(isEnterprise, id ?? user?.id);

  const TABS = [
    {
      value: 'enterprise',
      label: 'Enterprise',
      icon: <Iconify icon="mdi:office-building" />,
      component: <AccountEnterprise />,
      notPermission: [UserRole.USER],
      hideWhenUser: true,
    },
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <UserNewEditForm isEdit />,
      hideWhenUser: false,
    },
    // {
    //   value: 'billing',
    //   label: 'Billing',
    //   icon: <Iconify icon="ic:round-receipt" />,
    //   component: <AccountBilling cards={_userPayment} invoices={_userInvoices} />,
    // },
    {
      value: 'social_links',
      label: 'Social links',
      icon: <Iconify icon="eva:share-fill" />,
      component: <AccountSocialLinks social_links={userSocialLinks} user_id={id} tenant_id={id} />,
      hideWhenUser: false,
    },
    {
      value: 'change_password',
      label: 'Change password',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword user_id={id} />,
      hideWhenUser: true,
    },
  ];

  useEffect(() => {
    const defaultTab = isEnterprise ? 'enterprise' : 'general';
    setCurrentTab(defaultTab);

    if (slug !== ':slug') return;
    let path = user?.id && PATH_DASHBOARD.user.accountSlug(user.id);
    if (isEnterprise) path = user?.id && PATH_DASHBOARD.enterprise.accountSlug(user.id);

    if (path) navigate(path, { replace: true });
  }, [isEnterprise, navigate, slug, user?.id]);

  const visibleTabs = TABS.filter((tab) => {
    if (!user?.role) return false;
    if (!isEnterprise && tab.value === 'enterprise') return false;
    if (isEnterprise && tab.value === 'general') return false;
    if (isEnterprise && tab.value === 'change_password') return false;
    if (tab.notPermission?.includes(user.role)) return false;
    return true;
  });

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Account"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: `${isEnterprise ? 'Enterprise' : 'User'}`,
            href: PATH_DASHBOARD[`${isEnterprise ? 'enterprise' : 'user'}`].root,
          },
          { name: 'Account Settings' },
        ]}
      />

      <Tabs
        value={visibleTabs.some((t) => t.value === currentTab) ? currentTab : visibleTabs[0]?.value}
        onChange={(_, newValue) => setCurrentTab(newValue)}
      >
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
