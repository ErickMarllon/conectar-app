import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.fullscreen';
import 'leaflet.fullscreen/Control.FullScreen.css';

export default function FullscreenControl() {
  const map = useMap();

  useEffect(() => {
    const control = L.control.fullscreen({
      position: 'topleft',
      title: 'Show me the fullscreen !',
      titleCancel: 'Exit fullscreen mode',
      content: null,
      forceSeparateButton: false,
      forcePseudoFullscreen: false,
      fullscreenElement: false,
    });
    control.addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
}
