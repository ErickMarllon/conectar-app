// react router dom
// @mui
import { Divider } from '@mui/material';
// sections
import AboutHero from './components/AboutHero';
import AboutWhat from './components/AboutWhat';
import AboutVision from './components/AboutVision';
import AboutTeam from './components/AboutTeam';
import AboutTestimonials from './components/AboutTestimonials';

// ----------------------------------------------------------------------

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
