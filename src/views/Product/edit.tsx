import { paramCase } from 'param-case';

// @mui
import { Container } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '@/routes/paths';

// components
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useThemesStore } from '@/stores/themes.store';
import ProductNewEditForm from '@/components/ProductNewEditForm';
import { useListProducts } from '@/queries/products/useList/useListProducts';
import { useParams } from 'react-router-dom';
import { parseIdentifier } from '@/utils/parseIdentifierSlug';
import { OrderDirection } from '@/shared/enums/orderDirection';
// sections

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function EcommerceProductEditPage() {
  const { themeStretch } = useThemesStore();
  const { slug } = useParams<{ slug: string }>();
  const { id, name } = parseIdentifier(slug);

  const { data } = useListProducts({
    params: {
      page: 1,
      limit: 10,
      orderBy: OrderDirection.DESC,
      filters: {
        name,
        id,
      },
    },
  });
  const currentProduct = data?.data?.find(
    (product) => paramCase(product.name) === name || paramCase(product.id) === id,
  );

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit product"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'E-Commerce',
            href: PATH_DASHBOARD.eCommerce.root,
          },
          { name: currentProduct?.name },
        ]}
      />

      <ProductNewEditForm isEdit currentProduct={currentProduct} />
    </Container>
  );
}
