import { Divider } from '@mui/material';
import AboutHero from './components/AboutHero';
import AboutTeam from './components/AboutTeam';
import AboutTestimonials from './components/AboutTestimonials';
import AboutVision from './components/AboutVision';
import AboutWhat from './components/AboutWhat';

export function AboutPage() {
  return (
    <>
      <AboutHero />

      <AboutWhat />

      <AboutVision />

      <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

      <AboutTeam />

      <AboutTestimonials />
    </>
  );
}
