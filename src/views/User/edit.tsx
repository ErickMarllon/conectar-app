import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserNewEditForm from './components/UserNewEditForm';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Loading from '@/components/loading';
import { useUserById } from '@/queries/user/useUserById/useUserById';
import { PATH_DASHBOARD } from '@/routes/paths';
import { useThemesStore } from '@/stores/themes.store';
import { formatFullName } from '@/utils/format/formatFullName';
import { parseIdentifier } from '@/utils/parseIdentifierSlug';

export function UserEditPage() {
  const { themeStretch } = useThemesStore();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { id } = parseIdentifier(slug);

  useEffect(() => {
    if (!id) {
      navigate(PATH_DASHBOARD.user.list, { replace: true });
    }
  }, [id, navigate]);

  const { data: currentUser, isLoading } = useUserById(id);

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit user"
        links={[
          {
            name: 'Dashboard',
            href: PATH_DASHBOARD.root,
          },
          {
            name: 'User',
            href: PATH_DASHBOARD.user.list,
          },
          { name: formatFullName(currentUser?.first_name, currentUser?.first_name) },
        ]}
      />
      {isLoading ? (
        <Box>
          <Loading />
        </Box>
      ) : (
        <UserNewEditForm isEdit />
      )}
    </Container>
  );
}
