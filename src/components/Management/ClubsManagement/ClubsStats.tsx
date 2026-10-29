import { StatCard } from "../AdminUI";
// src/components/Management/ClubsManagement/ClubsStats.tsx
export default function ClubsStats() {
  const stats = [
    {
      title: 'Total Clubs',
      value: '24',
      icon: '🏆',
      change: '+2 this season',
      changeType: 'positive' as const
    },
    {
      title: 'Active Clubs',
      value: '22',
      icon: '✅',
      change: '2 inactive',
      changeType: 'neutral' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
