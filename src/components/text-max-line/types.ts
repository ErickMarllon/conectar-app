// @mui
import type { TypographyVariant } from '@mui/material/styles/createTypography';
import type { TypographyProps, LinkProps } from '@mui/material';
//

// ----------------------------------------------------------------------

type IProps = TypographyProps & LinkProps;

export interface TextMaxLineProps extends IProps {
  line?: number;
  asLink?: boolean;
  persistent?: boolean;
  children: React.ReactNode;
  variant?: TypographyVariant;
}
