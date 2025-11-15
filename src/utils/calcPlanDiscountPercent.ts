import type { IPlan } from '@/shared/interfaces/IPlan';
import { PlanInterval } from '@/shared/enums';

export function calcDiscountPercent(plans?: IPlan[], tier?: string): string {
  if (!plans) return '0.00';
  const monthlyPlan = plans.find((p) => p.tier === tier && p.interval === PlanInterval.MONTHLY);
  const annualPlan = plans.find((p) => p.tier === tier && p.interval === PlanInterval.ANNUALLY);

  if (!monthlyPlan || !annualPlan) return '0.00';

  const monthlyPrice = monthlyPlan.details?.price ?? 0;
  const annualPrice = annualPlan.details?.price ?? 0;

  const percent = ((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12)) * 100;

  return percent.toFixed(2);
}
