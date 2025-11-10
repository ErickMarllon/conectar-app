import { Marker, type PopupProps } from 'react-leaflet';
import type { SxProps, Theme } from '@mui/material/styles';
import type { LatLngTuple } from 'leaflet';
import type React from 'react';
import { StyledPopup } from './styles';

interface MapControlPopupProps extends PopupProps {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}

export default function MapPopup({ sx, children, position, ...other }: MapControlPopupProps) {
  return (
    <Marker position={position as LatLngTuple}>
      <StyledPopup sx={sx} {...other}>
        {children}
      </StyledPopup>
    </Marker>
  );
}
