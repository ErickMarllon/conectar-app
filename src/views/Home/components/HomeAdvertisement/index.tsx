import { Container, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Content from './Content';
import Description from './Description';
import { MotionViewport } from '@/components/animate';
import { bgGradient } from '@/utils/cssStyles';

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(10, 0),
  height: '100%',
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(20, 0),
  },
}));

export default function HomeAdvertisement() {
  const theme = useTheme();

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Stack
          alignItems="center"
          direction={{ xs: 'column', md: 'row' }}
          sx={{
            ...bgGradient({
              direction: '135deg',
              startColor: theme.palette.secondary.dark,
              endColor: theme.palette.common.black,
            }),
            borderRadius: 2,
            pb: { xs: 5, md: 0 },
          }}
        >
          <Content />
          <Description />
        </Stack>
      </Container>
    </StyledRoot>
  );
}
