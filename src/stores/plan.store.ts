import { create } from 'zustand';
import type { IPlan } from '@/shared/interfaces/IPlan';
import { PlanInterval } from '@/shared/enums';

interface PlanStore {
  plans: IPlan[];
  selectedInterval: PlanInterval;
  setPlans: (plans: IPlan[]) => void;
  toggleInterval: () => void;
  getPlansByInterval: () => IPlan[] | undefined;
  findPlan: (filters: Partial<IPlan>) => IPlan | undefined;
}

export const usePlanStore = create<PlanStore>((set, get) => ({
  plans: [] as IPlan[],

  selectedInterval: PlanInterval.MONTHLY,

  setPlans: (plans) => set({ plans }),

  toggleInterval: () =>
    set((state) => ({
      selectedInterval:
        state.selectedInterval === PlanInterval.MONTHLY
          ? PlanInterval.ANNUALLY
          : PlanInterval.MONTHLY,
    })),

  getPlansByInterval: () => {
    const { plans, selectedInterval } = get();
    return plans?.filter((plan) => plan.interval === selectedInterval);
  },

  findPlan: (filters) => {
    const { plans } = get();
    if (!plans) return undefined;

    return plans.find((plan) =>
      Object.entries(filters ?? {}).every(([key, value]) => {
        const planValue = plan[key as keyof IPlan];

        if (typeof planValue === 'string' && typeof value === 'string') {
          return planValue.toLowerCase() === value.toLowerCase();
        }

        return planValue === value;
      }),
    );
  },
}));
