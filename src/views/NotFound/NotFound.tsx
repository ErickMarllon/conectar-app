import Lottie from 'lottie-react';
import animationData from '../../assets/animation/notfound.json';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { MotionContainer, varBounce } from '@/components/animate';

export function NotFound() {
  return (
    <MotionContainer display="grid" gap={2}>
      <m.div variants={varBounce().in}>
        <Lottie animationData={animationData} loop autoplay renderer="svg" />
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography variant="h3">Page not found</Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          The page you are trying to access does not exist or you don&apos;t have permission.
        </Typography>
      </m.div>

      <Button component={RouterLink} to="/" size="large" variant="contained">
        Go to Home
      </Button>
    </MotionContainer>
  );
}
