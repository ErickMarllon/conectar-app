import { Box, Stack, Switch, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PricingPlanCard from './PricingPlanCard';
import { varFade } from '@/components/animate';
import Loading from '@/components/loading';
import { useListPlan } from '@/queries/plan/list/useListPlan';
import { usePlanStore } from '@/stores/plan.store';

export function Content() {
  const { selectedInterval, toggleInterval } = usePlanStore();
  const { t } = useTranslation();

  const { data, isLoading } = useListPlan({
    params: {
      limit: 6,
    },
  });

  const plansByInterval = useMemo(
    () => data?.data?.filter((plan) => plan?.interval === selectedInterval) ?? [],
    [data, selectedInterval],
  );

  const formattedPercent = useMemo(
    () => data?.data?.find((plan) => plan?.tier?.toLowerCase() === 'enterprise')?.details?.discount,
    [data],
  );
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
    <>
      <motion.div
        variants={varFade().inRight}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Box sx={{ my: 5 }}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Typography variant="overline" sx={{ mr: 1.5 }}>
              {t(`pricingPlans:monthly`)}
            </Typography>

            <Switch onChange={toggleInterval} />
            <Typography variant="overline" sx={{ ml: 1.5 }}>
              {t(`pricingPlans:yearly`)}
              {` (${t('pricingPlans:savepercent', { percent: formattedPercent })})`}
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            align="right"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            * {t(`pricingPlans:plusapplicabletaxes`)}
          </Typography>
        </Box>
      </motion.div>

      <Box gap={3} display="grid" gridTemplateColumns={{ md: 'repeat(3, 1fr)' }}>
        {plansByInterval?.map((plan, index) => (
          <PricingPlanCard key={plan.tier} plan={plan} index={index} />
        ))}
      </Box>
    </>
  );
}
