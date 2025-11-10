import { Card, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { varFade } from '@/components/animate';
import Iconify from '@/components/iconify';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  textAlign: 'center',
  justifyItems: 'center',
  padding: theme.spacing(10, 5),
  [theme.breakpoints.up('md')]: {
    boxShadow: 'none',
  },
}));

type HelpYouCardProps = {
  icon: string;
  title: string;
  description: string;
  index: number;
};

export default function HelpYouCard({ icon, title, description, index }: HelpYouCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={varFade().inUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <StyledCard
        sx={{
          ...(index === 1 && {
            boxShadow: (theme) => ({
              md: `-40px 40px 80px ${
                theme.palette.mode === 'light'
                  ? alpha(theme.palette.grey[500], 0.16)
                  : alpha(theme.palette.common.black, 0.4)
              }`,
            }),
          }),
        }}
      >
        <Iconify icon={icon} width={48} height={48} />
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          {t(`home:helpyou.${title}`)}
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>{t(`home:helpyou.${description}`)}</Typography>
      </StyledCard>
    </motion.div>
  );
}
