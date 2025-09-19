import Iconify from '@/components/iconify';
import { IconButton } from '@mui/material';

export default function FullScreenOptions() {
  const onToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <IconButton onClick={onToggleFullScreen}>
      <Iconify icon="solar:full-screen-square-linear" />
    </IconButton>
  );
}
