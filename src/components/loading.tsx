import { alpha, Backdrop, Typography, type SxProps, type Theme } from '@mui/material';
import { lazy, useEffect } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import animationData from '../assets/animation/Animation-Loading.json';
import { MotionContainer } from './animate';

const Lottie = lazy(() => import('lottie-react'));
const _loadingVariants = tv({
  base: 'flex items-center justify-center z-50 p-0 ',
  variants: {
    mode: {
      local: 'relative border-none ',
      modal:
        'fixed bg-transparent border-none shadow-none outline-none ring-0 focus:ring-0 focus:outline-none',
      global: 'fixed',
    },
    size: {
      sm: 'w-[40px] h-[40px]',
      md: 'w-[80px] h-[80px]',
      lg: 'w-[120px] h-[120px]',
      xl: 'w-[160px] h-[160px]',
      full: 'w-full h-full',
      auto: 'w-auto h-auto',
    },
  },

  defaultVariants: {
    mode: 'local',
    size: 'full',
  },
});
interface LoadingProps extends VariantProps<typeof _loadingVariants> {
  className?: string;
  sx?: SxProps<Theme>;
}

const animation = (
  <Lottie
    animationData={animationData}
    loop
    autoplay
    renderer="svg"
    style={{ width: '100%', height: '100%' }}
  />
);

export default function Loading({ ...props }: LoadingProps) {
  if (props?.mode === 'modal') return LoadingModal(props);
  if (props?.mode === 'global') return LoadingGlobal({ ...props });

  return (
    <MotionContainer>
      <Typography visibility={'hidden'} position={'absolute'}>
        Loading
      </Typography>
      <Typography visibility={'hidden'} position={'absolute'}>
        Please wait while we load the content.
      </Typography>
      {animation}
    </MotionContainer>
  );
}

export function LoadingGlobal({ sx }: LoadingProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  return (
    <Backdrop
      invisible={false}
      sx={[
        (theme) => ({
          background: alpha(theme.palette.grey[900], 0.4),
          zIndex: theme.zIndex.drawer + 10,
          position: 'fixed',
          overflow: 'hidden',
          maxHeight: '100dvh',
          minHeight: '100dvh',
          height: '100dvh',
          '& > div': {
            zIndex: `${theme.zIndex.drawer + 20} `,
            position: 'fixed',
            maxHeight: '100dvh',
            minHeight: '100dvh',
            height: '100dvh',
          },
        }),
        ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
      ]}
      open={true}
    >
      <Typography visibility={'hidden'} position={'absolute'}>
        Loading
      </Typography>
      <Typography visibility={'hidden'} position={'absolute'}>
        Please wait while we load the content.
      </Typography>
      {animation}
    </Backdrop>
  );
}

export function LoadingModal({ sx }: LoadingProps) {
  return (
    <Backdrop
      invisible={true}
      sx={[
        {
          position: 'absolute',
          overflow: 'hidden',
          height: '100%',
          zIndex: 100,

          '& > div': {
            position: 'absolute',
            zIndex: 100,
          },
        },
        ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
      ]}
      open={true}
    >
      <Typography visibility={'hidden'} position={'absolute'}>
        Loading
      </Typography>
      <Typography visibility={'hidden'} position={'absolute'}>
        Please wait while we load the content.
      </Typography>

      {animation}
    </Backdrop>
  );
}
