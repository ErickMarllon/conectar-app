// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';
// _mock_
import { _invoices } from '@/_mock/arrays';

// components
import { useThemesStore } from '@/stores/themes.store';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
// sections
import { useParams } from 'react-router-dom';
import { parseIdentifier } from '@/utils/parseIdentifierSlug';
import InvoiceDetails from './components/details';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function InvoiceDetailsPage() {
  const { themeStretch } = useThemesStore();
  const { slug } = useParams<{ slug: string }>();
  const { id, name } = parseIdentifier(slug);

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: `INV-${currentInvoice?.invoiceNumber}` },
          ]}
        />

        <InvoiceDetails invoice={currentInvoice} />
      </Container>
    </>
  );
}
