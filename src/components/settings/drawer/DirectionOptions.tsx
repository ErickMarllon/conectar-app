import { RadioGroup } from '@mui/material';
import type { ThemeDirectionValue } from '../types';
import SvgColor from '../../svg-color';
import { MaskControl, StyledCard, StyledWrap } from '../styles';
import { useThemesStore } from '@/stores/themes.store';

const OPTIONS = ['ltr', 'rtl'] as const;

export default function DirectionOptions() {
  const { themeDirection, setThemeDirection } = useThemesStore();
  return (
    <RadioGroup
      name="themeDirection"
      value={themeDirection}
      onChange={(e) => setThemeDirection(e.target.value as ThemeDirectionValue)}
    >
      <StyledWrap>
        {OPTIONS.map((direction) => (
          <StyledCard key={direction} selected={themeDirection === direction}>
            <SvgColor
              src={`/assets/icons/setting/${
                direction === 'rtl' ? 'ic_align_right' : 'ic_align_left'
              }.svg`}
            />

            <MaskControl value={direction} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
