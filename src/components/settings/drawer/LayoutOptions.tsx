// @mui
import { RadioGroup } from '@mui/material';
//
import { StyledCard, StyledWrap, MaskControl, LayoutIcon } from '../styles';
import { useThemesStore } from '@/stores/themes.store';
import type { ThemeLayoutValue } from '../types';

// ----------------------------------------------------------------------

const OPTIONS = ['vertical', 'horizontal', 'mini'] as const;

export default function LayoutOptions() {
  const { themeLayout, setThemeLayout } = useThemesStore();

  return (
    <RadioGroup
      name="themeLayout"
      value={themeLayout}
      onChange={(e) => setThemeLayout(e.target.value as ThemeLayoutValue)}
    >
      <StyledWrap sx={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {OPTIONS.map((layout) => (
          <StyledCard key={layout} selected={themeLayout === layout} sx={{ p: 0.75, height: 56 }}>
            <LayoutIcon layout={layout} />
            <MaskControl value={layout} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
