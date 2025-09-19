import { Box, useTheme } from '@mui/material';
import HomeHero from './components/HomeHero';
import HomeMinimal from './components/HomeMinimal';
import HomeHugePackElements from './components/HomeHugePackElements';
import HomeForDesigner from './components/HomeForDesigner';
import HomeDarkMode from './components/HomeDarkMode';
import HomeColorPresets from './components/HomeColorPresets';
import HomeCleanInterfaces from './components/HomeCleanInterfaces';
import HomePricingPlans from './components/HomePricingPlans';
import HomeLookingFor from './components/HomeLookingFor';
import HomeAdvertisement from './components/HomeAdvertisement';
import { m, useScroll, useSpring } from 'framer-motion';

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
        <HomeMinimal />
        <HomeHugePackElements />
        <HomeForDesigner />
        <HomeDarkMode />
        <HomeColorPresets />
        <HomeCleanInterfaces />
        <HomePricingPlans />
        <HomeLookingFor />
        <HomeAdvertisement />
      </Box>
    </Box>
  );
}
