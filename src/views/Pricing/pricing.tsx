// @mui
import { Box, Switch, Container, Typography, Stack } from '@mui/material';
// _mock_
import { _pricingPlans } from '@/_mock/arrays';

// sections
import PricingPlanCard from './components/PricingPlanCard';
import { useListPlan } from '@/queries/plan/list/useListPlan';
import { useMemo, useState } from 'react';
import { PlanInterval } from '@/shared/enums';
import Description from './components/Description';
import { Content } from './components/Content';

// ----------------------------------------------------------------------

export function PricingPage() {
  return (
    <>
      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <Description />
        <Content />
      </Container>
    </>
  );
}
