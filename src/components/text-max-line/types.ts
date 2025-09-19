// @mui
import type { TypographyProps, LinkProps, TypographyVariant } from '@mui/material';
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
