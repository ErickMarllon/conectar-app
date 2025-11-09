import { styled } from '@mui/material/styles';
import { Trans } from 'react-i18next';
import { CARDS } from '../../constants/homeMiminimalCards';
import HelpYouHeader from './HelpYouHeader';
import HelpYouSection from './HelpYouSection';

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

export default function HelpYou() {
  return (
    <StyledRoot>
      <HelpYouHeader>
        <Trans i18nKey="helpyou.what_flux_helps_you" components={[<br />]} ns="home" />
      </HelpYouHeader>
      <HelpYouSection cards={CARDS.slice(3)} />
      <HelpYouSection cards={CARDS.slice(0, 3)} />
    </StyledRoot>
  );
}
