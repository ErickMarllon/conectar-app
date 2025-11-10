import { Container } from '@mui/material';
import UserNewEditForm from './components/UserNewEditForm';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '@/routes/paths';
import { useThemesStore } from '@/stores/themes.store';

export function UserCreatePage() {
  const { themeStretch } = useThemesStore();

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          {
            name: 'Dashboard',
            href: PATH_DASHBOARD.root,
          },
          {
            name: 'User',
            href: PATH_DASHBOARD.user.list,
          },
          { name: 'New user' },
        ]}
      />
      <UserNewEditForm />
    </Container>
  );
}
