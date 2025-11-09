import { varFade } from '@/components/animate';
import { Card } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { type ElevateCardProps } from '../../constants/ElevateMarketingCards';
import CardContent from './CardContent';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,

  textAlign: 'center',
  padding: theme.spacing(10, 5),
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(5),
  height: '100%',

  [theme.breakpoints.up('md')]: {
    boxShadow: 'none',
  },
}));

interface Props {
  card: ElevateCardProps;
  index: number;
  totalCards: number;
}

export default function MarketingCard({ card, index, totalCards }: Props) {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={varFade().inUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <StyledCard
        className={`${index !== totalCards - 1 ? 'flex-col' : 'flex-col md:flex-row'} `}
        sx={{
          boxShadow: (theme) => ({
            ...(index === 2 && {
              md: `-40px 40px 80px ${
                theme.palette.mode === 'light'
                  ? alpha(theme.palette.grey[500], 0.16)
                  : alpha(theme.palette.common.black, 0.4)
              }`,
            }),
          }),
        }}
      >
        <CardContent
          title={t(`home:elevateMarketing.${card.title}`)}
          description={t(`home:elevateMarketing.${card.description}`)}
          index={index}
          totalCards={totalCards}
        />
        <img src={card.image} alt="img" className="max-h-60 object-contain" />
      </StyledCard>
    </motion.div>
  );
}
