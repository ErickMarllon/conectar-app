import { GlobalStyles } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Popup as LeafletPopup } from 'react-leaflet';
import { bgBlur } from '../../utils/cssStyles';

function StyledMapControls() {
  const theme = useTheme();

  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        '.leaflet-bar': {
          border: 'none !important',
          borderRadius: '8px',
        },
        '.leaflet-control': {
          borderRadius: '8px',
          transform: 'scale(0.75)',
        },
        '.leaflet-control a': {
          backgroundColor: alpha(theme.palette.grey[100], 1),
        },
        '.leaflet-bottom a+a': {
          borderTop: `1px solid ${theme.palette.divider}`,
        },
        '.mapboxgl-ctrl.mapboxgl-ctrl-scale': {
          border: 'none',
          lineHeight: '14px',
          borderRadius: '4px',
          color: theme.palette.common.white,
          fontWeight: theme.typography.fontWeightBold,
          backgroundImage: `linear-gradient(to right, #8a2387, #e94057, #f27121)`,
        },
      }}
    />
  );

  return inputGlobalStyles;
}

const StyledPopup = styled(LeafletPopup)(({ theme }) => {
  const isRTL = theme.direction === 'rtl';

  return {
    '& .mapboxgl-popup-content': {
      maxWidth: 180,
      padding: theme.spacing(1),
      boxShadow: theme.customShadows.z20,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[800],
    },
    '& .mapboxgl-popup-close-button': {
      width: 24,
      height: 24,
      fontSize: 16,
      opacity: 0.48,
      color: theme.palette.common.white,
      right: isRTL && '0',
      left: isRTL && 'auto',
      '&:hover': {
        opacity: 1,
      },
      '&:focus': {
        outline: 'none',
      },
    },
    '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': {
      marginBottom: -1,
      borderBottomColor: theme.palette.grey[800],
    },
    '&.mapboxgl-popup-anchor-right .mapboxgl-popup-tip': {
      marginLeft: -1,
      borderLeftColor: theme.palette.grey[800],
    },
    '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': {
      marginTop: -1,
      borderTopColor: theme.palette.grey[800],
    },
    '&.mapboxgl-popup-anchor-left .mapboxgl-popup-tip': {
      marginRight: -1,
      borderRightColor: theme.palette.grey[800],
    },
  };
});

const StyledControlPanel = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.grey[900] }),
  zIndex: 9,
  minWidth: 200,
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

export { StyledControlPanel, StyledMapControls, StyledPopup };
