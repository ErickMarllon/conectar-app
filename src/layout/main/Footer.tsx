import { Box, Container, Divider, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { _socials } from '../../_mock/arrays';
import Iconify from '../../components/iconify';
import Logo from '../../components/logo';
import { PATH_PAGE } from '../../routes/paths';

const LINKS = [
  {
    headline: 'Minimal',
    children: [
      { name: 'About us', href: PATH_PAGE.about },
      { name: 'Contact us', href: PATH_PAGE.contact },
      { name: 'FAQs', href: PATH_PAGE.faqs },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
          sx={{
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
        >
          <Grid size={{ xs: 12 }} sx={{ mb: 3 }}>
            <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
          </Grid>

          <Grid size={{ xs: 8, md: 3 }}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              The starting point for your next project with Minimal UI Kit, built on the newest
              version of Material-UI ©, ready to be customized to your style.
            </Typography>

            <Stack
              spacing={1}
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: 5,
                mb: { xs: 5, md: 0 },
              }}
            >
              {_socials.map((social) => (
                <IconButton key={social.name}>
                  <Iconify icon={social.icon} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid
            sx={{
              display: 'grid',
              rowGap: { xs: 4, md: 10 },
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
            }}
          >
            {LINKS.map((list) => (
              <Stack key={list.headline} spacing={2}>
                <Typography component="div" variant="overline">
                  {list.headline}
                </Typography>

                {list.children.map((link) => (
                  <Link
                    key={link.name}
                    component={RouterLink}
                    to={link.href}
                    color="inherit"
                    variant="body2"
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            ))}
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: 10,
            pb: 5,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          © 2021. All rights reserved
        </Typography>
      </Container>
    </Box>
  );
}
