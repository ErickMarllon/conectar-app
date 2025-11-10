import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import Iconify from '@/components/iconify';
import { MapControl, MapMarker, MapPopup } from '@/components/map';

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .leaflet-control-attribution': {
    display: 'none !important',
  },
}));

type CountryData = {
  latlng: number[];
  address: string;
  phone_number: string;
};

type Props = {
  contacts: CountryData[];
};

export default function ContactMap({ contacts }: Props) {
  const [popupInfo, setPopupInfo] = useState<CountryData | null>(null);
  const centerPosition = [contacts[0].latlng[0], contacts[0].latlng[1]] as LatLngTuple;
  return (
    <StyledRoot>
      <MapContainer
        center={centerPosition}
        zoom={10}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {contacts.map((country, index) => (
          <MapMarker
            key={`marker-${index}`}
            position={[country.latlng[0], country.latlng[1]]}
            eventHandlers={{
              click: (event) => {
                event.originalEvent.stopPropagation();
                setPopupInfo(country);
              },
            }}
          />
        ))}
        {popupInfo && (
          <MapPopup position={centerPosition}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Address
            </Typography>

            <Typography component="div" variant="caption">
              {popupInfo.address}
            </Typography>

            <Typography
              component="div"
              variant="caption"
              sx={{ mt: 1, display: 'flex', alignItems: 'center' }}
            >
              <Iconify icon="eva:phone-fill" width={14} sx={{ mr: 0.5 }} />
              {popupInfo.phone_number}
            </Typography>
          </MapPopup>
        )}
        <MapControl />
      </MapContainer>
    </StyledRoot>
  );
}
