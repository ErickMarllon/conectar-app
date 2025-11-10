import { RadioGroup } from '@mui/material';
import SvgColor from '../../svg-color';
import { MaskControl, StyledCard, StyledWrap } from '../styles';
import { useThemesStore } from '@/stores/themes.store';

const OPTIONS = ['light', 'dark'] as const;

export default function ModeOptions() {
  const { themeMode, setThemeMode } = useThemesStore();

  return (
    <RadioGroup
      name="themeMode"
      value={themeMode}
      onChange={(e) => setThemeMode(e.target.value as 'light' | 'dark')}
    >
      <StyledWrap>
        {OPTIONS.map((mode) => (
          <StyledCard key={mode} selected={themeMode === mode}>
            <SvgColor
              src={`/assets/icons/setting/${mode === 'light' ? 'ic_sun' : 'ic_moon'}.svg`}
            />

            <MaskControl value={mode} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
