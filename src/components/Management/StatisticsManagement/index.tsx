// src/components/Management/StatisticsManagement/index.tsx
import StatisticsManagementHeader from './StatisticsManagementHeader';
import StatisticsOverview from './StatisticsOverview';
import PlayerStats from './PlayerStats';
import TeamStats from './TeamStats';

export default function StatisticsManagement() {
  return (
    <div className="statistics-management">
      <StatisticsManagementHeader />
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <StatisticsOverview />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8">
          <PlayerStats />
          <TeamStats />
        </div>
      </div>
    </div>
  );
}
