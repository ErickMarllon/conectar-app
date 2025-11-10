import { Container, Grid } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { motion } from 'motion/react';
import Description from './Description';
import FlagsGrid from './FlagsGrid';
import TriangleShape from './TriangleShape';
import { WorldMap } from '@/assets/icons';
import { MotionViewport, varFade } from '@/components/animate';
const MotionWorldMap = motion.create(WorldMap);

const StyledRoot = styled('div')(() => ({
  position: 'relative',
}));

const StyledWrap = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative',
}));

const MapContainer = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  padding: theme.spacing(16, 0),

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(26, 0),
  },
}));

const StyledContent = styled(MotionWorldMap)(({ theme }) => ({
  color: alpha(theme.palette.primary.main, 0.6),
  position: 'absolute',
  zIndex: 1,
  left: 0,
}));

export default function GlobalReachSection() {
  const theme = useTheme();

  return (
    <StyledRoot>
      <StyledWrap>
        <Container
          component={MotionViewport}
          style={{
            maxWidth: '100%',
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <Grid container alignItems="stretch">
            <Grid size={{ xs: 12, md: 6 }}>
              <Description />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <MapContainer
                variants={varFade().inRight}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {theme.breakpoints.down('md') && <TriangleShape />}
                <StyledContent />

                <FlagsGrid />
              </MapContainer>
            </Grid>
          </Grid>
        </Container>
        <TriangleShape />
        <TriangleShape anchor="bottom" />
      </StyledWrap>
    </StyledRoot>
  );
}
