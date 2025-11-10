import { Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { Trans, useTranslation } from 'react-i18next';
import { varFade } from '@/components/animate';

export default function Description() {
  const { t } = useTranslation();

  return (
    <Stack spacing={3} sx={{ mb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
          {t(`home:pricingPlans.overline`)}
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2" color="common.white">
          <Trans ns="home" i18nKey="pricingPlans.title" />
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.disabled' }}>
          {t(`home:pricingPlans.description`)}
        </Typography>
      </m.div>
    </Stack>
  );
}
