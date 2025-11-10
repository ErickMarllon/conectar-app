import { Box, Stack, Switch, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PricingPlanCard from './PricingPlanCard';
import { varFade } from '@/components/animate';
import { useListPlan } from '@/queries/plan/list/useListPlan';
import { PlanInterval } from '@/shared/enums';

export function Content() {
  const [interval, setInterval] = useState<PlanInterval>(PlanInterval.MONTHLY);

  const { t } = useTranslation();
  const { data } = useListPlan({
    params: {
      limit: 6,
    },
  });
  const plansByInterval = useMemo(
    () => data?.data?.filter((plan) => plan?.interval === interval) ?? [],
    [data, interval],
  );
  const formattedPercent = useMemo(() => {
    const monthlyPlan = data?.data?.find(
      (p) => p.tier === 'Enterprise' && p.interval === PlanInterval.MONTHLY,
    );
    const annualPlan = data?.data?.find(
      (p) => p.tier === 'Enterprise' && p.interval === PlanInterval.ANNUALLY,
    );
    if (!monthlyPlan || !annualPlan) return '0.00';

    const percent =
      (((monthlyPlan.details?.price ?? 0) * 12 - (annualPlan.details?.price ?? 0)) /
        ((monthlyPlan.details?.price ?? 0) * 12)) *
      100;

    return percent.toFixed(2);
  }, [data]);

  const handleToggleInterval = () => {
    setInterval((prev) =>
      prev === PlanInterval.MONTHLY ? PlanInterval.ANNUALLY : PlanInterval.MONTHLY,
    );
  };
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

            <Switch onChange={handleToggleInterval} />
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
        {plansByInterval?.map((card, index) => (
          <PricingPlanCard key={card.tier} card={card} index={index} />
        ))}
      </Box>
    </>
  );
}
