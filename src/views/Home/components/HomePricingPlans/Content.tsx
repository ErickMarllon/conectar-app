import { varFade } from '@/components/animate';
import useResponsive from '@/hooks/useResponsive';
import { useListPlan } from '@/queries/plan/list/useListPlan';
import { PATH_PAGE } from '@/routes/paths';
import { PlanInterval } from '@/shared/enums';
import { Box, Button, Stack, Switch, Tab, Tabs, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PlanCard from './PlanCard';

export default function Content() {
  const isDesktop = useResponsive('up', 'md');
  const { t } = useTranslation();
  const [interval, setInterval] = useState<PlanInterval>(PlanInterval.MONTHLY);
  const [currentTab, setCurrentTab] = useState<string>('Free');
  const { data } = useListPlan({
    params: {
      limit: 6,
    },
  });
  const plansByInterval = useMemo(
    () => data?.data?.filter((plan) => plan?.interval === interval) ?? [],
    [data, interval],
  );
  const desktopList = (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      sx={{
        zIndex: 10,
        borderRadius: 2,
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      {plansByInterval?.map((plan, idx) => (
        <motion.div key={plan.tier} variants={varFade().in}>
          <PlanCard key={plan.tier} plan={plan} idx={idx} />
        </motion.div>
      ))}
    </Box>
  );

  const mobileList = (
    <>
      <Stack alignItems="center" sx={{ mb: 5 }}>
        <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)}>
          {plansByInterval?.map((tab) => (
            <Tab key={tab.tier} value={tab.tier} label={tab.tier} />
          ))}
        </Tabs>
      </Stack>

      <Box
        sx={{
          borderRadius: 2,
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {plansByInterval?.map(
          (tab, idx) =>
            tab.tier === currentTab && (
              <PlanCard
                key={tab.tier}
                idx={idx}
                plan={tab}
                sx={{ borderLeft: (theme) => `dashed 1px ${theme.palette.divider}` }}
              />
            ),
        )}
      </Box>
    </>
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
          <Stack direction="row" color="common.white" alignItems="center" justifyContent="flex-end">
            <Typography variant="overline" sx={{ mr: 1.5, textTransform: 'uppercase' }}>
              {t(`home:pricingPlans.monthly`)}
            </Typography>

            <Switch onChange={handleToggleInterval} />
            <Typography variant="overline" sx={{ ml: 1.5 }}>
              {t(`home:pricingPlans.yearly`)}
              {` (${t('home:pricingPlans.savePercent', { percent: formattedPercent })})`}
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            align="right"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            * {t(`home:pricingPlans.plusApplicableTaxes`)}
          </Typography>
        </Box>
      </motion.div>

      {isDesktop ? desktopList : mobileList}

      <motion.div>
        <Box
          sx={{
            textAlign: 'center',
            mt: {
              xs: 5,
              md: 10,
            },
          }}
        >
          <motion.div
            variants={varFade().inLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Typography variant="h4" color="common.white">
              {t(`home:pricingPlans.questions`)}
            </Typography>
          </motion.div>

          <motion.div
            variants={varFade().inRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Typography sx={{ mt: 2, mb: 5, color: 'text.disabled' }}>
              {t(`home:pricingPlans.advice`)}
            </Typography>
          </motion.div>

          <motion.div
            variants={varFade().inUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Button size="large" variant="contained" href={PATH_PAGE.contact}>
              {t(`home:pricingPlans.contact`)}
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </>
  );
}
