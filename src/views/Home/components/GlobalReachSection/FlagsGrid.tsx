import { styled } from '@mui/material/styles';
import { motion } from 'motion/react';
import { allFlags } from '../../constants/allFlags';

const StyledFlagsGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  zIndex: 2,
  justifyItems: 'center',
  alignItems: 'center',
  transform: 'translate(60%, 0%) rotate(25deg) !important',

  [theme.breakpoints.up('sm')]: {
    transform: 'translate(60%, 0%) rotate(25deg) !important',
  },

  [theme.breakpoints.up('md')]: {
    transform: 'translate(40%, 0%) rotate(27deg) !important',
  },

  [theme.breakpoints.up('lg')]: {
    transform: 'translate(60%, 0%) rotate(27deg) !important',
  },
}));

export default function FlagsGrid() {
  return (
    <StyledFlagsGrid>
      <div className="grid grid-cols-2 gap-1">
        {Object.entries(allFlags).map(([name, src]) => (
          <motion.img
            key={name}
            src={src as string}
            alt={name.replace('./', '').replace('.svg', '')}
            style={{
              width: 'clamp(40px, 16vw, 82px)',
              height: 'auto',
            }}
          />
        ))}
      </div>
    </StyledFlagsGrid>
  );
}
