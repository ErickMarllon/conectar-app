// @mui
import { RadioGroup, Typography } from '@mui/material';
//
import { useThemesStore } from '@/stores/themes.store';
import { MaskControl, StyledCard, StyledWrap } from '../styles';
import type { ThemeFontFamily } from '../types';
import Block from './Block';
import { fontFamilyOptions } from '../typography';

// ----------------------------------------------------------------------

export default function TypographyOptions() {
  const { themeFontFamily, setThemeFontFamily, themeMode } = useThemesStore();

  return (
    <RadioGroup
      name="themeFontFamily"
      id="themeFontFamily"
      value={themeFontFamily}
      onChange={(e) => setThemeFontFamily(e.target.value as ThemeFontFamily)}
    >
      <StyledWrap sx={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {fontFamilyOptions.map((font) => {
          return (
            <StyledCard
              key={font.name}
              selected={themeFontFamily === font.value}
              sx={{
                p: 0.75,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* <Iconify
                icon="mdi:format-letter-case"
                width={26}
                height={26}
                sx={{ '& path': { strokeWidth: 0.8, stroke: 'currentColor', fillOpacity: 0.5 } }}
              /> */}
              <Typography
                sx={{ display: 'flex', fontWeight: 'bold', fontSize: 18, alignItems: 'flex-end' }}
              >
                <span>A</span>
                <span style={{ opacity: 0.5 }}>a</span>
              </Typography>
              <MaskControl value={font.value} />
              <Block
                title={font.name}
                sx={{ m: 0 }}
                color={themeMode === 'light' ? 'text.secundary' : 'text.primary'}
              />
            </StyledCard>
          );
        })}
      </StyledWrap>
    </RadioGroup>
  );
}
