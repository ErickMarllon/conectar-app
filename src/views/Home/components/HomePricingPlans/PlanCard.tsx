import { PlanFreeIcon, PlanPremiumIcon, PlanStarterIcon } from '@/assets/icons';
import Iconify from '@/components/iconify';
import { useCurrencyConverter } from '@/hooks/ useCurrencyConverter';
import useLocales from '@/hooks/useLocales';
import { allLangs } from '@/locales/config-lang';
import { PATH_PAGE } from '@/routes/paths';
import type { IPlan } from '@/shared/interfaces/IPlan';
import { Box, Button, Divider, Stack, Typography, type StackProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface PlanCardProps extends StackProps {
  plan: IPlan;
  idx: number;
}

export default function PlanCard({ plan, idx, sx, ...other }: PlanCardProps) {
  const { tier, interval, features, details } = plan;
  const { t } = useTranslation();
  const { currentLang } = useLocales();
  const free = tier?.toLowerCase() === 'free';
  const pro = tier?.toLowerCase() === 'pro';
  const enterprise = tier?.toLowerCase() === 'enterprise';
  function cleanString(str?: string): string {
    return str
      ? str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9]/g, '')
          .toLowerCase()
      : '';
  }
  const { convert } = useCurrencyConverter();

  return (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        pt: 10,
        pb: 14,
        position: 'relative',
        height: '100%',
        ...(pro && {
          borderLeft: (theme) => `dashed 1px ${theme.palette.divider}`,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...sx,
        }),
      }}
      {...other}
    >
      <Stack spacing={2}>
        <Box sx={{ position: 'relative' }}>
          <Typography
            variant="h4"
            color="common.white"
            sx={{
              zIndex: 20,
            }}
          >
            {t(`pricingPlans:${tier}`)}
          </Typography>
          <Box
            sx={{
              left: 0,
              bottom: 4,
              width: 40,
              zIndex: 10,
              height: 8,
              opacity: 0.48,
              position: 'absolute',
              ...(free && { bgcolor: 'error.main' }),
              ...(pro && { bgcolor: 'primary.main' }),
              ...(enterprise && { bgcolor: 'warning.main' }),
            }}
          />
        </Box>
      </Stack>

      <Stack spacing={1} direction="row" sx={{ my: 2 }}>
        <Typography variant="h5" sx={{ color: (theme) => theme.palette.primary.dark }}>
          {currentLang.currencySymbol}
        </Typography>

        <Typography variant="h2" sx={{ color: (theme) => theme.palette.primary.main }}>
          {!details?.price || details?.price === 0
            ? 'Free'
            : convert(details.price, allLangs['pt-BR'].currency, currentLang.currency)}
        </Typography>

        {(idx === 1 || idx === 2) && (
          <Typography
            component="span"
            sx={{ color: (theme) => theme.palette.primary.dark, textTransform: 'capitalize' }}
          >
            {t(`pricingPlans:${interval?.toLowerCase()}`)}
          </Typography>
        )}
      </Stack>
      <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize',
        }}
      >
        {t(`pricingPlans:plans.${tier.toLowerCase()}.${interval.toLowerCase()}.billingperiod`)}
      </Typography>
      <Box sx={{ width: 80, height: 80, mt: 5 }}>
        {(tier === 'Free' && <PlanFreeIcon />) || (tier === 'Pro' && <PlanStarterIcon />) || (
          <PlanPremiumIcon />
        )}
      </Box>
      <Stack spacing={2.5}>
        {details?.included_features?.map((option) => (
          <Stack key={option} spacing={1} direction="row" alignItems="center">
            <Iconify icon="eva:checkmark-fill" width={16} />
            <Typography variant="body2" component="p" color="common.white">
              {t(
                `pricingPlans:plans.${tier.toLowerCase()}.${interval.toLowerCase()}.includedfeatures.${cleanString(option.toLowerCase())}`,
              )}
            </Typography>
          </Stack>
        ))}
        <Divider sx={{ borderStyle: 'dashed' }} />

        {features?.map((option, optionIndex) => {
          const disabled = !option.is_available;

          return (
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              color="common.white"
              sx={{
                ...(disabled && { color: 'text.disabled' }),
              }}
              key={`${optionIndex}-${option.feature_text}`}
            >
              {option.feature_text && (
                <Iconify icon={disabled ? 'eva:close-fill' : 'eva:checkmark-fill'} width={16} />
              )}
              <Typography variant="body2" component="p">
                {t(
                  `pricingPlans:plans.${tier.toLowerCase()}.${interval.toLowerCase()}.features.${cleanString(option.feature_text.toLowerCase())}`,
                )}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
      <Stack alignItems="flex-end" position="absolute" bottom={20} right={10}>
        <Button
          size="small"
          target="_blank"
          rel="noopener"
          href={PATH_PAGE.pricing}
          endIcon={<Iconify icon="eva:chevron-right-fill" />}
          sx={{
            textAlign: 'center',
            px: 2,
            py: 2,
          }}
        >
          {t(`actions:learnmore`)}
        </Button>
      </Stack>
    </Stack>
  );
}
