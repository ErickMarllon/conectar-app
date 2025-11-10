import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import type { ICheckoutBillingAddress } from '@/shared/interfaces/IProduct';
import Iconify from '@/components/iconify';

type Props = {
  billing: ICheckoutBillingAddress | null;
  onBackStep: VoidFunction;
};

export default function CheckoutBillingInfo({ billing, onBackStep }: Props) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Billing Address"
        action={
          <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />} onClick={onBackStep}>
            Edit
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {billing?.receiver}&nbsp;
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            ({billing?.addressType})
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
          {billing?.fullAddress}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {billing?.phone_number}
        </Typography>
      </CardContent>
    </Card>
  );
}
