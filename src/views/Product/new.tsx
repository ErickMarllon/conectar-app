import { Container } from '@mui/material';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import ProductNewEditForm from '@/components/ProductNewEditForm';
import { PATH_DASHBOARD } from '@/routes/paths';
import { useThemesStore } from '@/stores/themes.store';

export function EcommerceProductCreatePage() {
  const { themeStretch } = useThemesStore();

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new product"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'New product' },
          ]}
        />
        <ProductNewEditForm />
      </Container>
    </>
  );
}
