import { Container } from '@mui/material';
import { Content } from './components/Content';
import Description from './components/Description';

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
