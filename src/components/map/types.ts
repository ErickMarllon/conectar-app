import type { MapContainerProps } from 'react-leaflet';

// ----------------------------------------------------------------------

export type MapBoxProps = Omit<MapContainerProps, 'fog' | 'terrain'>;

export type MapSettings = {
  minZoom: number;
  maxZoom: number;
  minPitch: number;
  maxPitch: number;
  dragPan: boolean;
  boxZoom: boolean;
  keyboard: boolean;
  touchZoom: boolean;
  dragRotate: boolean;
  scrollZoom: boolean;
  touchPitch: boolean;
  touchRotate: boolean;
  doubleClickZoom: boolean;
  touchZoomRotate: boolean;
};

export type MapSettingKeys =
  | 'dragPan'
  | 'dragRotate'
  | 'scrollZoom'
  | 'touchZoom'
  | 'touchRotate'
  | 'keyboard'
  | 'doubleClickZoom'
  | 'minZoom'
  | 'maxZoom'
  | 'minPitch'
  | 'maxPitch';
