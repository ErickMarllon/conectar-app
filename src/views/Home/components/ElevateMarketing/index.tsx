import { Container } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { ELEVATEMARKETINGCARDS } from '../../constants/ElevateMarketingCards';
import HeaderSection from './HeaderSection';
import MarketingCard from './MarketingCard';
import { MotionViewport } from '@/components/animate';
import { bgGradient } from '@/utils/cssStyles';

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  position: 'relative',
  ...bgGradient({
    startColor: `${theme.palette.background.default} 25%`,
    endColor: alpha(theme.palette.background.default, 0),
  }),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(4),
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: Number(theme.shape.borderRadius) * 2,

  [theme.breakpoints.up('sm')]: {
    '& > :nth-of-type(1)': { flex: '1 1 calc(50% - 16px)' },
    '& > :nth-of-type(2)': { flex: '1 1 calc(50% - 16px)' },
    '& > :nth-of-type(3)': { flex: '1 1 100%' },
  },

  [theme.breakpoints.up('md')]: {
    '& > :nth-of-type(1)': { flex: '1 1 calc(40% - 16px)' },
    '& > :nth-of-type(2)': { flex: '1 1 calc(60% - 16px)' },
    '& > :nth-of-type(3)': { flex: '1 1 100%' },
  },
}));

export default function ElevateMarketing() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <HeaderSection />

        <StyledContent>
          {ELEVATEMARKETINGCARDS.map((card, index) => (
            <MarketingCard
              card={card}
              index={index}
              key={card.title}
              totalCards={ELEVATEMARKETINGCARDS.length}
            />
          ))}
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
