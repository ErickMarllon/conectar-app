import { Box, Container } from '@mui/material';
import { MotionViewport } from '@/components/animate';
import HelpYouCard from './HelpYouCard';

type SectionProps = {
  cards: {
    icon: string;
    title: string;
    description: string;
  }[];
};

export default function HelpYouSection({ cards }: SectionProps) {
  return (
    <Container component={MotionViewport}>
      <Box
        gap={{ xs: 3, lg: 10 }}
        display="grid"
        alignItems="center"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {cards.map((card, index) => (
          <HelpYouCard key={card.title} {...card} index={index} />
        ))}
      </Box>
    </Container>
  );
}
