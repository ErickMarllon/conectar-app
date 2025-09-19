// @mui
import { RadioGroup } from '@mui/material';
//
import SvgColor from '../../svg-color';
import { StyledCard, StyledWrap, MaskControl } from '../styles';
import { useThemesStore } from '@/stores/themes.store';
import type { ThemeContrastValue } from '../types';

// ----------------------------------------------------------------------

const OPTIONS = ['default', 'bold'] as const;

export default function ContrastOptions() {
  const { themeContrast, setThemeContrast } = useThemesStore();

  return (
    <RadioGroup
      name="themeContrast"
      value={themeContrast}
      onChange={(e) => setThemeContrast(e.target.value as ThemeContrastValue)}
    >
      <StyledWrap>
        {OPTIONS.map((contrast) => (
          <StyledCard key={contrast} selected={themeContrast === contrast}>
            <SvgColor
              src={`/assets/icons/setting/${
                contrast === 'bold' ? 'ic_contrast_bold' : 'ic_contrast'
              }.svg`}
            />

            <MaskControl value={contrast} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
