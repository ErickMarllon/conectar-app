import { useState } from 'react';

// @mui
import { alpha } from '@mui/material/styles';
import { Box, Tab, Tabs, Card, Grid, Divider, Container, Typography, Stack } from '@mui/material';
// redux
// routes
import { PATH_DASHBOARD } from '@/routes/paths';
// @types

// components
import Iconify from '@/components/iconify';
import Markdown from '@/components/markdown';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { SkeletonProductDetails } from '@/components/skeleton';
// sections

import { useParams } from 'react-router-dom';
import { useListProducts } from '@/queries/products/useList/useListProducts';
import { paramCase } from 'param-case';
import { useProductStore } from '@/stores/useProduct.store';
import { useThemesStore } from '@/stores/themes.store';
import type { ICheckoutCartItem } from '@/shared/interfaces/IProduct';
import CartWidget from '@/components/CartWidget';
import ProductDetailsReview from './components/ProductDetailsReview';
import ProductDetailsCarousel from './components/ProductDetailsCarousel';
import ProductDetailsSummary from './components/ProductDetailsSummary';
import { parseIdentifier } from '@/utils/parseIdentifierSlug';
import { OrderDirection } from '@/shared/enums/orderDirection';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'ic:round-verified-user',
  },
];

export function EcommerceProductDetailsPage() {
  const { themeStretch } = useThemesStore();
  const { slug } = useParams<{ slug: string }>();

  const { id, name } = parseIdentifier(slug);

  const { data, isLoading } = useListProducts({
    params: {
      page: 1,
      limit: 10,
      orderBy: OrderDirection.DESC,
      filters: {
        name: slug,
      },
    },
  });

  const { checkout, addToCart, gotoStep } = useProductStore();

  const [currentTab, setCurrentTab] = useState('description');

  const handleAddCart = (newProduct: ICheckoutCartItem) => {
    addToCart(newProduct);
  };

  const handleGotoStep = (step: number) => {
    gotoStep(step);
  };
  const product = data?.data?.find(
    (product) => paramCase(product.name) === name || paramCase(product.id) === id,
  );

  const TABS = [
    {
      value: 'description',
      label: 'description',
      component: product ? <Markdown children={product?.description} /> : null,
    },
    {
      value: 'reviews',
      label: `Reviews (${product ? product.reviews.length : ''})`,
      component: product ? <ProductDetailsReview product={product} /> : null,
    },
  ];

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Product Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            {
              name: 'Shop',
              href: PATH_DASHBOARD.eCommerce.shop,
            },
            { name: product?.name },
          ]}
        />

        <CartWidget totalItems={checkout.totalItems} />

        {product && (
          <>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6, lg: 7 }}>
                <ProductDetailsCarousel product={product} />
              </Grid>

              <Grid size={{ xs: 12, md: 6, lg: 5 }}>
                <ProductDetailsSummary
                  product={product}
                  cart={checkout.cart}
                  onAddCart={handleAddCart}
                  onGotoStep={handleGotoStep}
                />
              </Grid>
            </Grid>

            <Box
              gap={5}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
              sx={{ my: 10 }}
            >
              {SUMMARY.map((item) => (
                <Box key={item.title} sx={{ textAlign: 'center' }}>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      borderRadius: '50%',
                      color: 'primary.main',
                      bgcolor: (theme) => `${alpha(theme.palette.primary.main, 0.08)}`,
                    }}
                  >
                    <Iconify icon={item.icon} width={36} />
                  </Stack>

                  <Typography variant="h6" sx={{ mb: 1, mt: 3 }}>
                    {item.title}
                  </Typography>

                  <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                </Box>
              ))}
            </Box>

            <Card>
              <Tabs
                value={currentTab}
                onChange={(event, newValue) => setCurrentTab(newValue)}
                sx={{ px: 3, bgcolor: 'background.neutral' }}
              >
                {TABS.map((tab) => (
                  <Tab key={tab.value} value={tab.value} label={tab.label} />
                ))}
              </Tabs>

              <Divider />

              {TABS.map(
                (tab) =>
                  tab.value === currentTab && (
                    <Box
                      key={tab.value}
                      sx={{
                        ...(currentTab === 'description' && {
                          p: 3,
                        }),
                      }}
                    >
                      {tab.component}
                    </Box>
                  ),
              )}
            </Card>
          </>
        )}

        {isLoading && <SkeletonProductDetails />}
      </Container>
    </>
  );
}
