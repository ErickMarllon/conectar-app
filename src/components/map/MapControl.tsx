//
import { ZoomControl } from 'react-leaflet';
import FullscreenControl from './FullscreenControl';
import { StyledMapControls } from './styles';

// ----------------------------------------------------------------------

type Props = {
  hideScaleControl?: boolean;
  hideGeolocateControl?: boolean;
  hideFullscreenControl?: boolean;
  hideNavigationnControl?: boolean;
};

export default function MapControl({ hideScaleControl, hideFullscreenControl }: Props) {
  return (
    <>
      <StyledMapControls />
      {!hideFullscreenControl && <FullscreenControl />}
      {!hideScaleControl && <ZoomControl position="bottomleft" />}
    </>
  );
}
