import { Box, Link, type BoxProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 996 1438"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2219_2)">
            <path
              d="M166.654 857.333C129.782 820.444 129.782 783.556 166.654 746.667C203.526 709.778 249.615 709.778 304.923 746.667L498.5 940.333L692.077 746.667C747.385 709.778 793.474 709.778 830.346 746.667C867.218 783.556 867.218 820.444 830.346 857.333L636.769 1051L830.346 1244.67C867.218 1281.56 867.218 1318.44 830.346 1355.33C793.474 1392.22 747.385 1392.22 692.077 1355.33L498.5 1161.67L304.923 1355.33C249.615 1392.22 203.526 1392.22 166.654 1355.33C129.782 1318.44 129.782 1281.56 166.654 1244.67L360.231 1051L166.654 857.333Z"
              fill="url(#paint0_linear_2219_2)"
            />
            <path
              d="M0.5 110.5C0.5 36.7779 37.3611 -0.083252 111.083 -0.083252H885.167C958.889 -0.083252 995.75 36.7779 995.75 110.5C995.75 184.222 958.889 221.083 885.167 221.083H221.667V552.833H664C737.722 552.833 774.583 589.695 774.583 663.417C774.583 737.139 737.722 774 664 774H221.667V1326.92C221.667 1400.64 184.806 1437.5 111.083 1437.5C37.3611 1437.5 0.5 1400.64 0.5 1326.92V110.5Z"
              fill="url(#paint1_linear_2219_2)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_2219_2"
              x1="36089"
              y1="719"
              x2="36089"
              y2="67119"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={PRIMARY_DARK} />
              <stop offset="1" stopColor={PRIMARY_LIGHT} />
            </linearGradient>
            <linearGradient
              id="paint1_linear_2219_2"
              x1="99525.5"
              y1="14298.1"
              x2="37046"
              y2="48948.8"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={PRIMARY_DARK} />
              <stop offset="1" stopColor={PRIMARY_MAIN} />
            </linearGradient>
            <clipPath id="clip0_2219_2">
              <rect width="996" height="1438" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  },
);

export default Logo;
