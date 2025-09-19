// sections
import { Box, Container } from '@mui/material';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ContactMap from './components/ContactMap';
import { _mapContact } from '@/_mock/arrays';

// ----------------------------------------------------------------------

export function ContactPage() {
  return (
    <>
      <ContactHero />

      <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <ContactForm />

          <ContactMap contacts={_mapContact} />
        </Box>
      </Container>
    </>
  );
}
