import { Marker, type PopupProps } from 'react-leaflet';
// @mui
import type { Theme, SxProps } from '@mui/material/styles';
//
import { StyledPopup } from './styles';
import type React from 'react';
import type { LatLngTuple } from 'leaflet';

// ----------------------------------------------------------------------

interface MapControlPopupProps extends PopupProps {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

export default function MapPopup({ sx, children, position, ...other }: MapControlPopupProps) {
  return (
    <Marker position={position as LatLngTuple}>
      <StyledPopup sx={sx} {...other}>
        {children}
      </StyledPopup>
    </Marker>
  );
}
