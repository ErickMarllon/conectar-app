import { PATH_DASHBOARD } from '@/routes/paths';
import { useLocation } from 'react-router-dom';
import { EnterpriseCards } from './enterpriseCards';
import { UserCards } from './userCards';

export function UserCardsPage() {
  const locale = useLocation();

  const isEnterprise = locale.pathname === PATH_DASHBOARD.enterprise.cards;

  return <>{isEnterprise ? <EnterpriseCards /> : <UserCards />}</>;
}
