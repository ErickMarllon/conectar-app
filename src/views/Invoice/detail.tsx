import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import InvoiceDetails from './components/details';
import { _invoices } from '@/_mock/arrays';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '@/routes/paths';
import { useThemesStore } from '@/stores/themes.store';
import { parseIdentifier } from '@/utils/parseIdentifierSlug';

export function InvoiceDetailsPage() {
  const { themeStretch } = useThemesStore();
  const { slug } = useParams<{ slug: string }>();
  const { id } = parseIdentifier(slug);

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
