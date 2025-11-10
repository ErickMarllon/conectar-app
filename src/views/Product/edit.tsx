import { Container } from '@mui/material';
import { paramCase } from 'param-case';
import { useParams } from 'react-router-dom';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import ProductNewEditForm from '@/components/ProductNewEditForm';
import { useListProducts } from '@/queries/products/useList/useListProducts';
import { PATH_DASHBOARD } from '@/routes/paths';
import { OrderDirection } from '@/shared/enums/orderDirection';
import { useThemesStore } from '@/stores/themes.store';
import { parseIdentifier } from '@/utils/parseIdentifierSlug';

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
