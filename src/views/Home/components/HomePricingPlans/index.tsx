import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Content from './Content';
import Description from './Description';
import { MotionViewport } from '@/components/animate';

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

export default function HomePricingPlans() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <StyledRoot
      style={{
        display: isLoading ? 'none ' : 'block',
      }}
    >
      <Container component={MotionViewport}>
        <Description />
        <Content onLoading={setIsLoading} />
      </Container>
    </StyledRoot>
  );
}
