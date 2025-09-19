import { m } from 'framer-motion';
// react router dom
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { SeverErrorIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

export function Page500() {
  return (
    <>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3">500 Internal Server Error</Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            There was an error, please try again later.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} to="/" size="large" variant="contained">
          Go to Home
        </Button>
      </MotionContainer>
    </>
  );
}
