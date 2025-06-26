import { useContext } from 'react';
import { DashboardUserModalContext } from './dashboard.context';

export function useDashboardUserModal() {
  const context = useContext(DashboardUserModalContext);
  if (!context) {
    throw new Error('useDashboardUserModal must be used within DashboardUserModalProvider');
  }
  return context;
}
