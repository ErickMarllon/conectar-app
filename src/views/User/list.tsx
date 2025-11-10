import { useLocation } from 'react-router-dom';
import { EnterpriseList, UserList } from './components/list';
import { PATH_DASHBOARD } from '@/routes/paths';

export function UserListPage() {
  const locale = useLocation();

  const isEnterprise = locale.pathname === PATH_DASHBOARD.enterprise.list;

  return <>{isEnterprise ? <EnterpriseList /> : <UserList />}</>;
}
