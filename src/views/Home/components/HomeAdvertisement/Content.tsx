import { Stack } from '@mui/material';
import { m } from 'framer-motion';
import { varFade } from '@/components/animate';
import Image from '@/components/image';

export default function Content() {
  return (
    <Stack component={m.div} variants={varFade().inUp} alignItems="center">
      <m.div
        animate={{
          y: [-20, 0, -20],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Image
          visibleByDefault
          disabledEffect
          alt="rocket"
          src="/assets/images/home/rocket.png"
          sx={{ maxWidth: 460 }}
        />
      </m.div>
    </Stack>
  );
}
