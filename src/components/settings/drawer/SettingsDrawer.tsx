import { Box, Divider, Drawer, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { m } from 'framer-motion';
import { useState } from 'react';
import Iconify from '../../iconify';
import Scrollbar from '../../scrollbar';
import { defaultSettings } from '../config-setting';
import BadgeDot from './BadgeDot';
import Block from './Block';
import ColorPresetsOptions from './ColorPresetsOptions';
import ContrastOptions from './ContrastOptions';
import DirectionOptions from './DirectionOptions';
import FullScreenOptions from './FullScreenOptions';
import LayoutOptions from './LayoutOptions';
import ModeOptions from './ModeOptions';
import StretchOptions from './StretchOptions';
import TypographyOptions from './TypographyOptions';
import { varRotate } from '@/components/animate';
import { NAV } from '@/configs/global';
import { useThemesStore } from '@/stores/themes.store';
import { bgBlur } from '@/utils/cssStyles';

const SPACING = 2.5;

export default function SettingsDrawer() {
  const {
    themeMode,
    themeLayout,
    themeStretch,
    themeContrast,
    themeDirection,
    themeColorPresets,
    onResetSetting,
  } = useThemesStore();

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  const notDefault =
    themeMode !== defaultSettings.themeMode ||
    themeLayout !== defaultSettings.themeLayout ||
    themeStretch !== defaultSettings.themeStretch ||
    themeContrast !== defaultSettings.themeContrast ||
    themeDirection !== defaultSettings.themeDirection ||
    themeColorPresets !== defaultSettings.themeColorPresets;

  return (
    <>
      <m.span
        variants={varRotate({ easeIn: 'linear' }).infinity}
        animate="animate"
        style={{
          maxWidth: 40,
          maxHeight: 40,
        }}
      >
        <IconButton
          sx={{
            color: (theme) => theme.palette.action.active,
            maxWidth: 40,
            maxHeight: 40,
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
          }}
          onClick={handleToggle}
        >
          <Iconify icon="solar:settings-bold-duotone" width={24} height={24} />
        </IconButton>
      </m.span>

      <Drawer
        key={`${new Date()}`}
        anchor={themeDirection === 'rtl' ? 'left' : 'right'}
        open={open}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            invisible: true,
          },
          paper: {
            sx: {
              ...bgBlur({ color: theme.palette.background.default, opacity: 0.9 }),
              width: NAV.W_BASE,
              boxShadow: `-24px 12px 40px 0 ${alpha(
                theme.palette.mode === 'light'
                  ? theme.palette.grey[500]
                  : theme.palette.common.black,
                0.16,
              )}`,
              height: '100%',
            },
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2, pr: 1, pl: SPACING }}
        >
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Settings
          </Typography>

          <Tooltip title="FullScreen">
            <Box sx={{ position: 'relative' }}>
              <FullScreenOptions />
            </Box>
          </Tooltip>

          <Tooltip title="Reset">
            <Box sx={{ position: 'relative' }}>
              {notDefault && <BadgeDot />}
              <IconButton onClick={onResetSetting}>
                <Iconify icon="ic:round-refresh" />
              </IconButton>
            </Box>
          </Tooltip>

          <IconButton onClick={handleClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ p: SPACING, pb: 0 }}>
          <Block title="Mode">
            <ModeOptions />
          </Block>

          <Block title="Contrast">
            <ContrastOptions />
          </Block>

          <Block title="Direction">
            <DirectionOptions />
          </Block>

          <Block title="Layout">
            <LayoutOptions />
          </Block>

          <Block title="Stretch" tooltip="Only available at large resolutions > 1600px (xl)">
            <StretchOptions />
          </Block>

          <Block title="Font">
            <TypographyOptions />
          </Block>

          <Block title="Presets">
            <ColorPresetsOptions />
          </Block>
        </Scrollbar>
      </Drawer>
    </>
  );
}
