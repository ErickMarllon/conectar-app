import { Container, Stack, Typography } from '@mui/material';
import { motion } from 'motion/react';
import type React from 'react';
import { MotionViewport, varFade } from '@/components/animate';

type HelpYouHeaderProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function HelpYouHeader({ title, children }: HelpYouHeaderProps) {
  return (
    <Container component={MotionViewport}>
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
          mb: { xs: 5, md: 10 },
        }}
      >
        <motion.div
          variants={varFade().inDown}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Typography variant="h2">
            {!children && title && title}
            {!title && children && children}
          </Typography>
        </motion.div>
      </Stack>
    </Container>
  );
}
