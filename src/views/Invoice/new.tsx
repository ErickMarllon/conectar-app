import { Container } from '@mui/material';
import InvoiceNewEditForm from './components/form';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '@/routes/paths';
import { useThemesStore } from '@/stores/themes.store';

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
