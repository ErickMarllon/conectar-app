import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import type {
  IUserAccountBillingCreditCard,
  IUserAccountBillingInvoice,
} from '@/shared/interfaces/IUser';
import AccountBillingAddressBook from './AccountBillingAddressBook';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import { useUserById } from '@/queries/user/useUserById/useUserById';
import { useAuthStore } from '@/stores/userAuth.store';

type Props = {
  cards: IUserAccountBillingCreditCard[];
  invoices: IUserAccountBillingInvoice[];
};

export default function AccountBilling({ cards, invoices }: Props) {
  const { user, isAdmin } = useAuthStore();
  const { data } = useUserById(user?.id);
  return (
    <Grid container spacing={5}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Stack spacing={3}>
          {isAdmin() && (
            <Card sx={{ p: 3 }}>
              <Typography
                variant="overline"
                sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
              >
                Your Plan
              </Typography>
              <Typography variant="h4">Premium</Typography>
              <Box
                sx={{
                  mt: { xs: 2, sm: 0 },
                  position: { sm: 'absolute' },
                  top: { sm: 24 },
                  right: { sm: 24 },
                }}
              >
                <Button size="small" color="inherit" variant="outlined" sx={{ mr: 1 }}>
                  Cancel plan
                </Button>
                <Button size="small" variant="outlined">
                  Upgrade plan
                </Button>
              </Box>
            </Card>
          )}

          <AccountBillingPaymentMethod cards={cards} />

          <AccountBillingAddressBook addressBook={data?.addresses} userId={user?.id} />
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <AccountBillingInvoiceHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
}
