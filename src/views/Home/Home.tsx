import { Box, styled, useTheme } from '@mui/material';
import { m, useScroll, useSpring } from 'framer-motion';
import ElevateMarketing from './components/ElevateMarketing';
import GlobalReachSection from './components/GlobalReachSection';
import HelpYou from './components/HelpYou';
import HomeAdvertisement from './components/HomeAdvertisement';
import HomeHero from './components/HomeHero';
import HomePricingPlans from './components/HomePricingPlans';
const StyledBg = styled('div')(() => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundImage: `url('/assets/background/overlay_4.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 100%',
    zIndex: 0,
  },
}));

export function Home() {
  const theme = useTheme();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX,
      }}
    />
  );

  return (
    <Box>
      {progress}
      <HomeHero />
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HelpYou />
        <ElevateMarketing />
        <GlobalReachSection />
        <StyledBg>
          <HomePricingPlans />
          <HomeAdvertisement />
        </StyledBg>
      </Box>
    </Box>
  );
}
