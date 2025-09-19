// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';

// _mock_
import { _invoices } from '@/_mock/arrays';
// components
import { useThemesStore } from '@/stores/themes.store';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import InvoiceNewEditForm from './components/form';
import { useParams } from 'react-router-dom';
import { parseIdentifier } from '@/utils/parseIdentifierSlug';
// sections

// ----------------------------------------------------------------------

export function InvoiceEditPage() {
  const { themeStretch } = useThemesStore();
  const { slug } = useParams<{ slug: string }>();
  const { id } = parseIdentifier(slug);

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit invoice"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.list,
            },
            { name: `INV-${currentInvoice?.invoiceNumber}` },
          ]}
        />

        <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} />
      </Container>
    </>
  );
}
