// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';

// components
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
// sections
import { useThemesStore } from '@/stores/themes.store';
import ProductNewEditForm from '@/components/ProductNewEditForm';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

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
