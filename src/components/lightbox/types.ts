import type { ViewCallbackProps } from 'yet-another-react-lightbox';
import type { LightboxExternalProps } from 'yet-another-react-lightbox';

// ----------------------------------------------------------------------

export interface LightBoxProps extends LightboxExternalProps {
  disabledZoom?: boolean;
  disabledVideo?: boolean;
  disabledTotal?: boolean;
  disabledCaptions?: boolean;
  disabledSlideshow?: boolean;
  disabledThumbnails?: boolean;
  disabledFullscreen?: boolean;
  onGetCurrentIndex?: (index: ViewCallbackProps) => void;
}
