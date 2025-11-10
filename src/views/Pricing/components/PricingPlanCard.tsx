import { Box, Button, Card, Divider, Stack, Typography, type CardProps } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { IPlan } from '@/shared/interfaces/IPlan';
import { PlanFreeIcon, PlanPremiumIcon, PlanStarterIcon } from '@/assets/icons';
import Iconify from '@/components/iconify';
import Label from '@/components/label';
import { useCurrencyConverter } from '@/hooks/ useCurrencyConverter';
import useLocales from '@/hooks/useLocales';
import { allLangs } from '@/locales/config-lang';

interface Props extends CardProps {
  card: IPlan;
  index: number;
}

export default function PricingPlanCard({ card, index, sx, ...other }: Props) {
  const { convert } = useCurrencyConverter();
  const { t } = useTranslation();
  const { currentLang } = useLocales();

  const { tier, interval, features, details } = card;
  function cleanString(str?: string): string {
    return str
      ? str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9]/g, '')
          .toLowerCase()
      : '';
  }

  return (
    <Card
      sx={{
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',

        boxShadow: (theme) => theme.customShadows.z24,
        ...((index === 0 || index === 2) && {
          boxShadow: 'none',
          bgcolor: 'background.default',
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }),
        ...sx,
      }}
      {...other}
    >
      {index === 1 && (
        <Label color="info" sx={{ top: 16, right: 16, position: 'absolute' }}>
          POPULAR
        </Label>
      )}
      <Stack>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          {t(`pricingPlans:${tier}`)}
        </Typography>

        <Stack spacing={1} direction="row" sx={{ my: 2 }}>
          {(index === 1 || index === 2) && (
            <Typography variant="h5">{currentLang.currencySymbol}</Typography>
          )}

          <Typography variant="h2">
            {!details?.price || details?.price === 0
              ? 'Free'
              : convert(details.price, allLangs['pt-BR'].currency, currentLang.currency)}
          </Typography>

          {(index === 1 || index === 2) && (
            <Typography component="span" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
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

        <Stack component="ul" spacing={2} sx={{ p: 0, my: 5 }}>
          {details?.included_features?.map((option) => (
            <Stack key={option} component="li" direction="row" alignItems="center" spacing={1}>
              <Iconify icon="eva:checkmark-fill" width={16} />
              <Typography variant="body2" component="p">
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
      </Stack>

      <Stack
        sx={{
          paddingTop: 0,
          paddingBottom: 6,
          position: 'relative',
        }}
      >
        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{
            position: 'absolute',
          }}
        >
          {t(
            `actions:${!details?.price || details?.price === 0 ? 'startFreeTrial' : 'purchasenow'}`,
          )}
        </Button>
      </Stack>
    </Card>
  );
}
