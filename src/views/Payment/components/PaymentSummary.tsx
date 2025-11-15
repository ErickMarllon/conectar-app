import { Box, Button, Divider, Stack, Typography, type BoxProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { IPlan } from '@/shared/interfaces/IPlan';
import { RHFSwitch } from '@/components/hook-form';
import Iconify from '@/components/iconify';
import Label from '@/components/label';
import { useCurrencyConverter } from '@/hooks/ useCurrencyConverter';
import useLocales from '@/hooks/useLocales';
import { allLangs } from '@/locales/config-lang';
import { PlanInterval } from '@/shared/enums';
import { usePlanStore } from '@/stores/plan.store';

type PaymentSummaryProps = BoxProps & {
  plan?: IPlan;
};

export default function PaymentSummary({ plan, sx, ...other }: PaymentSummaryProps) {
  const { toggleInterval, selectedInterval } = usePlanStore();
  const { currentLang } = useLocales();
  const { convert } = useCurrencyConverter();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" sx={{ mb: 5 }}>
        {t('paymentPlans:summary')}
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('paymentPlans:subscription')}
          </Typography>

          <Label
            color="success"
            sx={{
              textTransform: 'uppercase',
            }}
          >
            {plan?.tier}
          </Label>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('paymentPlans:billedAnnually')}
          </Typography>
          <RHFSwitch name="is_annually" onClick={toggleInterval} />
        </Stack>

        <Stack spacing={1} direction="row" justifyContent="flex-end">
          <Typography variant="h5">{currentLang.currencySymbol}</Typography>

          <Typography variant="h2">
            {plan?.details?.original_price && plan?.details?.original_price > 0
              ? convert(
                  plan?.details?.original_price,
                  allLangs['pt-BR'].currency,
                  currentLang.currency,
                )
              : 'Free'}
          </Typography>

          <Typography component="span" sx={{ mb: 1, alignSelf: 'center', color: 'text.secondary' }}>
            /
            {selectedInterval === PlanInterval.ANNUALLY
              ? t('paymentPlans:yearly')
              : t('paymentPlans:monthly')}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{t('paymentPlans:discount')}</Typography>

          <Typography variant="h6">{plan?.details?.discount}%</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{t('paymentPlans:totalBilled')}</Typography>

          <Typography variant="h6">
            {currentLang.currencySymbol}
            {plan?.details?.price && plan?.details?.price > 0
              ? convert(plan?.details.price, allLangs['pt-BR'].currency, currentLang.currency)
              : 'Free'}
            *
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>

      <Typography component="div" variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        {t('paymentPlans:plusTaxes')}
      </Typography>

      <Button fullWidth size="large" type="submit" variant="contained" sx={{ mt: 5, mb: 3 }}>
        Upgrade My Plan
      </Button>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="eva:shield-fill" sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle2">{t('paymentPlans:securePayment')}</Typography>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          {t('paymentPlans:secureSSL')}
        </Typography>
      </Stack>
    </Box>
  );
}
