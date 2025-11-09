import { varFade } from '@/components/animate';
import { PATH_PAGE } from '@/routes/paths';
import { bgGradient, textGradient } from '@/utils/cssStyles';
import { Button, Typography } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

const StyledDescription = styled('div')(({ theme }) => ({
  zIndex: 8,
  textAlign: 'center',
  paddingTop: theme.spacing(6),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  ...bgGradient({
    startColor: `${theme.palette.background.default} 25%`,
    endColor: alpha(theme.palette.background.default, 0),
  }),

  [theme.breakpoints.up('md')]: {
    background: 'unset',
    position: 'unset',
    textAlign: 'left',
    padding: theme.spacing(16, 8),
  },
}));

export default function Description() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <StyledDescription>
      <motion.div
        variants={varFade().inLeft}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Typography
          component="p"
          variant="overline"
          sx={{
            color: 'text.disabled',
            ...textGradient(
              `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 100%`,
            ),
          }}
        >
          {t(`home:homeForDesigner.overline`)}
        </Typography>
      </motion.div>

      <motion.div
        variants={varFade().inLeft}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Typography component="h2" variant="h4" sx={{ color: theme.palette.text.primary }}>
          <span
            style={{
              ...textGradient(
                `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 100%`,
              ),
            }}
          ></span>
          {t(`home:homeForDesigner.title`)}
        </Typography>
      </motion.div>

      <motion.div
        variants={varFade().inLeft}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Typography
          component="p"
          variant="body1"
          sx={{ mt: 3, color: theme.palette.text.primary, lineHeight: 1.8 }}
        >
          {t(`home:homeForDesigner.description`)}
        </Typography>
      </motion.div>
      <motion.div
        variants={varFade().inLeft}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Button
          variant="contained"
          component={RouterLink}
          rel="noopener"
          sx={{
            mt: 3,
            whiteSpace: 'nowrap',
          }}
          to={PATH_PAGE.pricing}
        >
          {t(`actions:purchasenow`)}
        </Button>
      </motion.div>
    </StyledDescription>
  );
}
