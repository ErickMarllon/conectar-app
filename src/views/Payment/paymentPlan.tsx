import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import PaymentBillingAddress from './components/PaymentBillingAddress';
import PaymentMethods from './components/PaymentMethods';
import PaymentSummary from './components/PaymentSummary';
import FormProvider from '@/components/hook-form';
import Loading from '@/components/loading';
import { useListPlan } from '@/queries/plan/list/useListPlan';
import { usePlanStore } from '@/stores/plan.store';

export function PaymentPlanPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { selectedInterval, setPlans, findPlan } = usePlanStore();
  const { data, isLoading } = useListPlan({
    params: {
      filters: {
        ...(slug ? { tier: slug } : {}),
      },
    },
  });

  useEffect(() => {
    if (data?.data) {
      setPlans(data?.data);
    }
  }, [data?.data, setPlans]);

  const plansByInterval = findPlan({
    interval: selectedInterval,
    ...(slug ? { tier: slug } : {}),
  });

  const methods = useForm({
    defaultValues: {},
  });

  const { handleSubmit } = methods;
  const onSubmit = (data: any) => console.log(data);

  if (isLoading) {
    return (
      <Loading
        mode="global"
        sx={(theme) => ({
          background: theme.palette.background.default,
        })}
      />
    );
  }
  return (
    <Container
      sx={{
        pt: 15,
        pb: 10,
      }}
    >
      <Typography variant="h3" align="center">
        {t('paymentPlans:title')}
      </Typography>

      <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
        {`${t('paymentPlans:description', { plan: plansByInterval?.tier })}`}
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid
          display="grid"
          gridTemplateColumns={{
            xs: '1fr',
            md: '1fr 40%',
          }}
        >
          <Grid>
            <Box
              gap={5}
              display="grid"
              sx={{
                p: { md: 5 },
                borderRadius: 2,
                border: (theme) => ({
                  md: `dashed 1px ${theme.palette.divider}`,
                }),
              }}
            >
              <PaymentBillingAddress />
              <PaymentMethods />
            </Box>
          </Grid>

          <Grid>
            <PaymentSummary plan={plansByInterval} />
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
