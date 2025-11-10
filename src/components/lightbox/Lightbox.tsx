import { Typography } from '@mui/material';
import ReactLightbox from 'yet-another-react-lightbox';
import { useLightboxState } from 'yet-another-react-lightbox/core';
import type { LightBoxProps } from './types';
import Iconify from '../iconify';
import StyledLightbox from './styles';
import { getPlugins } from './utils/getPlugins';

const ICON_SIZE = 24;

export default function Lightbox({
  slides,
  disabledZoom,
  disabledVideo,
  disabledTotal,
  disabledCaptions,
  disabledSlideshow,
  disabledThumbnails,
  disabledFullscreen,
  onGetCurrentIndex,
  ...other
}: LightBoxProps) {
  const totalItems = slides ? slides.length : 0;

  return (
    <>
      <StyledLightbox />

      <ReactLightbox
        slides={slides}
        animation={{ swipe: 240 }}
        carousel={{ finite: totalItems < 5 }}
        controller={{ closeOnBackdropClick: true }}
        plugins={getPlugins({
          disabledZoom,
          disabledVideo,
          disabledCaptions,
          disabledSlideshow,
          disabledThumbnails,
          disabledFullscreen,
        })}
        on={{
          view: (index) => {
            if (onGetCurrentIndex) {
              onGetCurrentIndex(index);
            }
          },
        }}
        toolbar={{
          buttons: [
            <DisplayTotal
              key={0}
              totalItems={totalItems}
              disabledTotal={disabledTotal}
              disabledCaptions={disabledCaptions}
            />,
            'close',
          ],
        }}
        render={{
          iconClose: () => <Iconify width={ICON_SIZE} icon="carbon:close" />,
          iconZoomIn: () => <Iconify width={ICON_SIZE} icon="carbon:zoom-in" />,
          iconZoomOut: () => <Iconify width={ICON_SIZE} icon="carbon:zoom-out" />,
          iconSlideshowPlay: () => <Iconify width={ICON_SIZE} icon="carbon:play" />,
          iconSlideshowPause: () => <Iconify width={ICON_SIZE} icon="carbon:pause" />,
          iconPrev: () => <Iconify width={ICON_SIZE + 8} icon="carbon:chevron-left" />,
          iconNext: () => <Iconify width={ICON_SIZE + 8} icon="carbon:chevron-right" />,
          iconExitFullscreen: () => <Iconify width={ICON_SIZE} icon="carbon:center-to-fit" />,
          iconEnterFullscreen: () => <Iconify width={ICON_SIZE} icon="carbon:fit-to-screen" />,
        }}
        {...other}
      />
    </>
  );
}

type DisplayTotalProps = {
  totalItems: number;
  disabledTotal?: boolean;
  disabledCaptions?: boolean;
};

export function DisplayTotal({ totalItems, disabledTotal, disabledCaptions }: DisplayTotalProps) {
  const { currentIndex } = useLightboxState();

  if (disabledTotal) {
    return null;
  }

  return (
    <Typography
      className="yarl__button"
      sx={{
        pl: 3,
        left: 0,
        position: 'fixed',
        typography: 'body2',
        ...(!disabledCaptions && {
          px: 'unset',
          minWidth: 64,
          position: 'unset',
          textAlign: 'center',
        }),
      }}
    >
      <strong> {currentIndex + 1} </strong> / {totalItems}
    </Typography>
  );
}
