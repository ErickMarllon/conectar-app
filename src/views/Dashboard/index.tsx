import { DashboardUserModalProvider } from './context/dashboard.provider';
import { Dashboard as DashboardContent } from './Dashboard';

export function Dashboard() {
  return (
    <DashboardUserModalProvider>
      <DashboardContent />
    </DashboardUserModalProvider>
  );
}
