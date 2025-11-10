import { Typography } from '@mui/material';
import { motion } from 'motion/react';
import { Trans, useTranslation } from 'react-i18next';
import { varFade } from '@/components/animate';

export default function Description() {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={varFade().inDown}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <Typography variant="h3" align="center">
        <Trans ns="pricingPlans" i18nKey="title" />
      </Typography>

      <Typography align="center" sx={{ color: 'text.secondary' }}>
        {t(`pricingPlans:description`)}
      </Typography>
    </motion.div>
  );
}
