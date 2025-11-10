import { MenuItem, Stack } from '@mui/material';
import { useState } from 'react';
import type { ThemeLangs } from '@/components/settings/types';
import { IconButtonAnimate } from '@/components/animate';
import Image from '@/components/image';
import MenuPopover from '@/components/menu-popover';
import useLocales from '@/hooks/useLocales';
import { allLangsArray } from '@/locales/config-lang';

export default function LanguagePopover() {
  const { currentLang, onChangeLang } = useLocales();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeLang = (newLang: ThemeLangs) => {
    onChangeLang(newLang);
    handleClosePopover();
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <Image disabledEffect src={currentLang.icon} alt={currentLang.label} />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{
          width: 180,
          top: {
            xs: '56px !important',
            md: '80px !important',
          },
        }}
      >
        <Stack spacing={0.75}>
          {allLangsArray.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={() => handleChangeLang(option.value as ThemeLangs)}
            >
              <Image
                disabledEffect
                alt={option.label}
                src={option.icon}
                sx={{ width: 28, mr: 2 }}
              />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
