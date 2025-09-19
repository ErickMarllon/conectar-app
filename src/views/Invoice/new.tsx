// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';

// components
import { useThemesStore } from '@/stores/themes.store';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import InvoiceNewEditForm from './components/form';
// sections

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function InvoiceCreatePage() {
  const { themeStretch } = useThemesStore();

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new invoice"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.list,
            },
            {
              name: 'New invoice',
            },
          ]}
        />

        <InvoiceNewEditForm />
      </Container>
    </>
  );
}
