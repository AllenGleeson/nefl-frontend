import { StatCard } from "../AdminUI";
// src/components/Management/NewsManagement/NewsStats.tsx
export default function NewsStats() {
  const stats = [
    {
      title: 'Total Articles',
      value: '156',
      icon: '📰',
      change: '+12 this month',
      changeType: 'positive' as const
    },
    {
      title: 'Published',
      value: '142',
      icon: '✅',
      change: '14 drafts',
      changeType: 'neutral' as const
    },
    {
      title: 'Total Views',
      value: '45,678',
      icon: '👁️',
      change: '+5,234 this week',
      changeType: 'positive' as const
    },
    {
      title: 'Avg. Views/Article',
      value: '293',
      icon: '📊',
      change: '+23 from last month',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
