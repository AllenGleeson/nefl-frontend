// src/components/Management/ManagementDashboard.tsx
import ManagementHeader from './ManagementHeader';
import ManagementStats from './ManagementStats';
import ManagementActions from './ManagementActions';
import RecentActivity from './RecentActivity';

export default function ManagementDashboard() {
  return (
    <div className="management-dashboard">
      <ManagementHeader />
      <ManagementStats />
      <ManagementActions />
      <RecentActivity />
    </div>
  );
}
